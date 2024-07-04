const catchAsyncError = require("../middlewares/catchAsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");


exports.processPayment = catchAsyncError(async (req, res, next) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const data = req.body;
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    }
    const order = await instance.orders.create(options);
    res.status(200).json({
        success: true,
        order
    })
});

exports.verifyPayment = catchAsyncError(async (req, res, next) => {
    const { razorPayOrderId, razorPayPaymentId, razorPaySignature } = req.body;
    const body = razorPayOrderId + "|" + razorPayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorPaySignature;

  if (isAuthentic) {
    res.status(200).json({
      success: true,
      razorPayDetails: {
        razorPayOrderId,
        razorPayPaymentId,
        razorPaySignature,
      }
    });

  } else {
    res.status(400).json({
      success: false,
    });
    }
});

exports.sendRazorPayKeyId = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        keyId: process.env.RAZORPAY_KEY_ID
    })
})
