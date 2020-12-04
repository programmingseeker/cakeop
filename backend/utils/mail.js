const nodemailer = require("nodemailer");
const catchAsync = require("./catchAsync.js");

exports.sendmail = catchAsync(async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "programmingseeker@gmail.com", // generated ethereal user
      pass: process.env.EMAILPASS, // generated ethereal password
    },
  });

  const mailOptions = {
    from: "programmingseeker@gmail.com",
    to:
      "programmingseeker@gmail.com, gauravsrao.dev@gmail.com, krtinshet.dev@gmail.com",
    subject: "Contact Form from Cakeop", // Subject line
    html: `<h3>Name : ${req.body.username}</h3><h3>Email : ${req.body.email}</h3><h3>PhoneNumber : ${req.body.phone}</h3><h3>Message : ${req.body.message}</h3>`,
  };

  console.log(req.bod.email);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ status: "success", data: info.response });
    }
  });
});
