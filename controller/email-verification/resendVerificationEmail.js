import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../../model/user.js';
import Verification from '../../model/verification.js';
import jwt from 'jsonwebtoken';
import { transporter } from '../../helpers/transporter.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const filePath = path.join(
      __dirname,
      "../../views/verificationEmailTemplate.html"
    );

    fs.readFile(filePath, "utf8", async (err, html) => {
      if (err) {
        console.error("Error reading email template:", err);
        return res.status(500).json({ message: "Server error" });
      }

      const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      await Verification.findOneAndUpdate(
        { userId: user._id },
        { token: verificationToken, createdAt: Date.now() },
        { upsert: true }
      );

      const verificationLink = `http://localhost:8080/api/verification/verify-email?token=${verificationToken}`;
      const emailHtml = html.replace("{{verificationLink}}", verificationLink);
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: emailHtml,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        }
        return res.status(200).json({ message: "Verification email sent" });
      });
    });
  } catch (error) {
    console.error("Resend verification email error:", error);
    return res.status(500).json({
      message: "An error occurred while resending the verification email",
    });
  }
};

export { resendVerificationEmail };
