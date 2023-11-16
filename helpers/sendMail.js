const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

require("dotenv").config();

const sendMail = async ({ to, subject, context }) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  };

  console.log(context);

  const transporter = nodemailer.createTransport(config);

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs", // handlebars extension
        layoutsDir: "views/email", // location of handlebars templates
        defaultLayout: "emailVerifyTemplate.hbs", // name of main template
      },
      viewPath: "views/email",
      extName: ".hbs",
    })
  );

  const emailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    template: "emailVerifyTemplate",
    context,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendMail;
