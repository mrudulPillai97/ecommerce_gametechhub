const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");

// create new order
exports.createOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user
    });

    const orderDetailsUrl = `${req.protocol}://${req.get("host")}/account/order/${order._id}`;

    const message = `Dear ${order.user.name},\n\nThank you for Shopping! Your ${order._id} will be shipped within 2 days. We will send you an email as soon as your order is on its way.\n\nTotal Amount - Rs ${order.totalPrice}.\n\nTo view your order click on below link:\n${orderDetailsUrl}\n\nBest Regards,\nE-Shopify`;

    try {
        await sendEmail({
            email: order.user.email,
            subject: `Order Confirmation`,
            message
        })

        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity, false);
        })

        res.status(200).json({
            success: true,
            message: `Order confirmation email has been sent to ${order.user.email}`
        })
    }
    catch(err) {
        return next(new ErrorHandler(err.message, 500));
    }

    res.status(201).json({
        success: true,
        order
    })
});

// get single order
exports.getOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order) {
        return next(new ErrorHandler("Order not found.", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
});

// get all orders --logged in
exports.getOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        ordersCount: orders?.length,
        orders
    })
});

// get all orders --admin
exports.getOrdersList = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let ordersAmount = 0;
    let ordersCount = 0;
    orders.forEach(order => {
        ordersAmount += order.totalPrice;
    })
    ordersCount = orders.length;

    res.status(200).json({
        success: true,
        ordersCount,
        ordersAmount,
        orders
    })
});

// update stock function 
async function updateStock(productId, quantity, isIncrease ) {
    const product = await Product.findById(productId);

    if(isIncrease === true) {
        product.stock += quantity;
    }
    else {
        if(product.stock - quantity < 0) {
            return next(new ErrorHandler("Stock not available.", 400));
        }
        product.stock -= quantity;
    }

    await product.save({validateBeforeSave: false});
}

// update order status --admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order not found.", 404));
    }
    
    if(order.orderStatus === "Processing" && req.body.orderData === "Shipped") {
        order.orderStatus = "Shipped";
        order.shippedAt = Date.now();
    }
    else if(order.orderStatus === "Shipped" && req.body.orderData === "Delivered") {
        order.orderStatus = "Delivered";
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Order Status has been updated.",
    })
});

// cancel order
exports.cancelOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order not found.", 404));
    }
    
    if(order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You cannot cancel the order once it has been Shipped or Delivered.", 400));
    }
    if(order.orderStatus === "Cancelled") {
        return next(new ErrorHandler("Order is already Cancelled.", 400));
    }

    
    if(req.body.newStatus === "Cancelled" && order.orderStatus === "Processing") {
        order.cancelledAt = Date.now();
        order.orderStatus = "Cancelled";
    }
    
    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity, true);
    })

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Order has been cancelled.",
    })
});

// delete order --admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order not found.", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: "Order has been deleted."
    })
});