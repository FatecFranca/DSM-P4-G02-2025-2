const express = require("express");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/loginController");
const authMiddleware = require("./middleware/authMiddleware");
const { updateUser } = require("../controllers/alteruserCOntroller");
const { resetPassword } = require('../controllers/passwordController');
const { requestPasswordReset } = require('../controllers/passwordController');

const router = express.Router();

router.post("/register", registerUser);
router.post('/login', loginUser);
router.patch('/update', authMiddleware, updateUser);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);
module.exports = router;
