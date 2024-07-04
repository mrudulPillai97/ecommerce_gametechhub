const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        maxLength: [50, "Name cannot be more than 30 characters."],
        minLength: [3, "Name must have at least 3 characters."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        validate: [validator.isEmail, "Invalid email."],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone Number is required."],
        length: [10, "Phone Number must have 10 digits."],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [8, "Password must have at least 8 characters."],
        select: false,
        trim: true
    },
    role: {
        type: String,
        default: "Customer"
    },
    verified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true })

// hashing password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// JWT token
userSchema.methods.getJwtToken = function() {
    return jwt.sign(
        {_id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

// compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// reset password token
userSchema.methods.getResetPasswordToken = function() {
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding reset password token to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);