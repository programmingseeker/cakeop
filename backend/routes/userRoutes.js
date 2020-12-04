const express = require("express");
const router = express.Router();
const {
  postLogin,
  postSignUp,
  getLogout,
  isLoggedIn,
  googleLogin,
  forgotPassword,
} = require("./../controllers/authController.js");
const { getMe, updateMe } = require("./../controllers/UserController.js");

router.route("/me").get(isLoggedIn, getMe).patch(isLoggedIn, updateMe);
router.post("/login", postLogin);
router.post("/login/google", googleLogin);
router.post("/signup", postSignUp);
router.get("/logout", isLoggedIn, getLogout);

router.post("/forget", forgotPassword);
router.patch("/reset/:token", forgotPassword);

module.exports = router;
