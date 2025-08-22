import nodemailer from "nodemailer";
// console.log(process.env.YOUR_EMAIL);
// console.log(process.env.YOUR_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.YOUR_EMAIL,
    pass: process.env.YOUR_PASS,
  },
});
export default transporter;
//this tells where to send mail and how
