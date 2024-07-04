const express = require("express");
const { authUser, authRole, verifyJWT } = require("../middlewares/auth");
const { processPayment, verifyPayment, sendRazorPayKeyId } = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment/process", verifyJWT, processPayment);
router.post("/payment/verify", verifyJWT, verifyPayment);
router.get("/payment/key", verifyJWT, sendRazorPayKeyId);

module.exports = router;