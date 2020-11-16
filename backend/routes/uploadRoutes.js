const path = require("path");
const express = require("express");
const uploadImage = require("./../utils/uploadImage.js");
const { restrictTo } = require("./../controllers/authController.js");
const { updateMe } = require("./../controllers/UserController.js");
const { sendmail } = require("./../utils/mail.js");

const router = express.Router();
const publicCakeImg = path.join(__dirname, "public/img/cake");
const publicUserImg = path.join(__dirname, "public/img/user");

const cakeImageUpload = uploadImage(publicCakeImg);
const userImageUpload = uploadImage(publicUserImg);

router.post(
  "/",
  restrictTo("admin"),
  cakeImageUpload.any("images", 5),
  (req, res) => {
    const data = [];
    req.files.map((file) => data.push(file.filename.toString()));
    res.json({ images: data });
  }
);

router.post(
  "/user",
  restrictTo("user"),
  userImageUpload.single("profileImage", 1),
  updateMe
);

router.post("/contactus", sendmail);

module.exports = router;
