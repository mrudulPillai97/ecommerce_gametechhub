const User = require("../models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
// const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { response } = require("express");

// refresh
exports.refresh = catchAsyncError(async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({
        message: "Unauthorized"
    });

    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,  async (err, decoded) => {
        if(err) return res.status(403).json({
            message: "Forbidden"
        })

        const user = await User.findById(decoded._id);
        if(!user) return res.status(401).json({
            message: "Unauthorized"
        })

        const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
        res.status(200).json({
            accessToken
        })
    })
});

// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    if(!name || !email || !phoneNumber || !password || !confirmPassword) {
        return next(new ErrorHandler("Please fill all the details.", 400));
    }

    if(password.length < 8) {
        return next(new ErrorHandler("Password must have at least 8 characters.", 400));
    }

    if(phoneNumber.length !== 10) {
        return next(new ErrorHandler("Phone Number must be 10 digits.", 400));
    }

    const isUserExist = await User.findOne({ email });
    
    if(isUserExist) {
        return next(new ErrorHandler("An account already exist with this email.", 400));
    }

    if(password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password must be same.", 400));
    }

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password,
    });
    
    // const token = user.getJwtToken();

    // options for cookie
    // const options = {
    //     expires: new Date(
    //         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //     ),
    //     maxAge: 360000,
    //     httpOnly: true,
    //     secure: true
    // }

    res.status(200).json({
        success: true,
        message: "User registered successfully.",
    })
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please fill all the details.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password.", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password.", 401));
    }

    // const token = user.getJwtToken();

    // options for cookie
    // const options = {
    //     expires: new Date(
    //         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //     ),
    //     maxAge: 360000,
    //     httpOnly: true,
    //     secure: true
    // }

    // res.status(200).cookie("token", token, options).json({
    //     success: true,
    //     message: "User logged in successfully.",
    //     token,
    //     user
    // })

    const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    // const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

    // create secure cookie with access token
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    res.cookie('jwt', accessToken, options);
    res.status(200).json({
        success: true,
        message: "User logged in successfully.",
        accessToken,
        user
    })
});

// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    // res.cookie("token", null, {
    //     expires: new Date(Date.now()),
    //     httpOnly: true,
    //     secure: true
    // });
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204).json({
        success: true,
        message: "No content."
    })

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };
    res.clearCookie('jwt', options);

    res.status(200).json({
        success: true,
        message: "User logged out."
    })
});

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler(`No account linked with email ${req.body.email}`, 404));
    }

    // get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Hi ${user.name},\n\nForgot your password?\n\nWe have received a request to reset the password for your account.\n\nTo reset your password, click on the link below:\n${resetPasswordUrl}\n\nKindly ignore, if you have not requested this email.\n\n\nE-Shopify`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Reset Password`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email has been sent to ${user.email}`
        })
    }
    catch(err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(err.message, 500));
    }
});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user) {
        return next(new ErrorHandler("Reset Password link is invalid or has been expired.", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password must be same.", 400));
    }

    if(req.body.password.length < 8) {
        return next(new ErrorHandler("Password must have at least 8 characters.", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password has been updated. Login to continue",
    })
});

// get user details --logged in
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
});

// update user password --logged in
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    if(!req.body.oldPassword || !req.body.password || !req.body.confirmPassword) {
        return next(new ErrorHandler("Please fill all the details.", 400));
    }
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(isPasswordMatched === false) {
        return next(new ErrorHandler("Old Password is incorrect.", 400));
    }
    
    if(req.body.password === req.body.oldPassword) {
        return next(new ErrorHandler("Old Password and New Password cannot be same.", 400));
    }
    
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("New Password and Confirm New Password must be same.", 400));
    }

    user.password = req.body.password;

    await user.save();

    const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    res.cookie('jwt', accessToken, options);

    res.status(200).json({
        success: true,
        message: "Password has been updated.",
        accessToken,
    })
});

// update user profile --logged in
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    }

    if(!newData.name || !newData.email || !newData.phoneNumber) {
        return next(new ErrorHandler("Please fill all the details.", 400));
    }

    if(newData.phoneNumber.length !== 10) {
        return next(new ErrorHandler("Phone Number must be 10 digits.", 400));
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Profile has been updated.",
        user
    })
});

// get all users --admin
exports.getUsersListAdmin = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    const usersCount = await User.countDocuments();

    res.status(200).json({
        success: true,
        usersCount,
        users
    })
});

// get user details --admin
exports.getUserDetailsAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
});

// update user role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if(!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        message: "User role has been updated successfully.",
        user
    })
});

// delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 400));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User has been deleted successfully."
    })
})