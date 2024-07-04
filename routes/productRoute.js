const express = require("express");
const { authUser, authRole, verifyJWT } = require("../middlewares/auth");
const { getProducts, getProduct, getProductsList, createProduct, deleteProduct, updateProduct, getReviews, createReview, deleteReview, getallProducts } = require("../controllers/productController");
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:productId", getProduct);

router.get("/admin/reviews", verifyJWT, authRole("Admin"), getReviews);
router.put("/product/:productId/review/write", verifyJWT, createReview);
router.delete("/product/:productId/review/delete", verifyJWT, deleteReview);

router.get("/admin/products", verifyJWT, authRole("Admin"), getProductsList);
router.post("/admin/product/new", verifyJWT, authRole("Admin"), createProduct);
router.put("/admin/product/:productId/update",verifyJWT, authRole("Admin"), updateProduct);
router.delete("/admin/product/:productId/delete", verifyJWT, authRole("Admin"), deleteProduct);


module.exports = router;
