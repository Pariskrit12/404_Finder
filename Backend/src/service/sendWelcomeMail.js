import transporter from "../config/nodemailer.js";

export const sendWelcomeMail = async (username, userEmail) => {
  try {
    const mailOptions = {
      from: process.env.YOUR_EMAIL,
      to: userEmail,
      subject: "Welcome to 404 Finder",
      html: `<p>${username} welcome</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email send successfully", username);
  } catch (err) {
    console.log("Failed to send email", err);
  }
};
