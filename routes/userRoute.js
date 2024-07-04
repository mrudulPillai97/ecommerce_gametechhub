const express = require("express");
const { registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getUserDetailsAdmin, getUsersListAdmin, updateUserRole, deleteUser, forgotPassword, resetPassword, refresh } = require("../controllers/userController");
const { authUser, authRole, verifyJWT } = require("../middlewares/auth");
const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
// router.get("/user/refresh", refresh);

router.get("/user/me", verifyJWT, getUserDetails);
router.put("/user/password/update", verifyJWT, updatePassword);
router.put("/user/profile/update", verifyJWT, updateProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/admin/users", verifyJWT, authRole("Admin"), getUsersListAdmin);
router.get("/admin/user/:userId", verifyJWT, authRole("Admin"), getUserDetailsAdmin);
router.put("/admin/user/:userId", verifyJWT, authRole("Admin"), updateUserRole);
router.delete("/admin/user/:userId", verifyJWT, authRole("Admin"), deleteUser);

module.exports = router;