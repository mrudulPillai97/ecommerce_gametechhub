const express = require("express");
const { authUser, authRole, verifyJWT } = require("../middlewares/auth");
const { createOrder, getOrders, getOrder, getOrdersList, deleteOrder, updateOrder, cancelOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/order/new", verifyJWT, createOrder);
router.get("/orders/me", verifyJWT, getOrders);
router.get("/order/:id", verifyJWT, getOrder);
router.put("/order/:id/cancel", verifyJWT, cancelOrder);

router.get("/admin/orders", verifyJWT, getOrdersList);
router.put("/admin/order/:id/update", verifyJWT, updateOrder);
router.delete("/admin/order/:id/delete", verifyJWT, deleteOrder );

module.exports = router;