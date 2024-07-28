import { Router } from "express";
import { getVerificationEmailPage, verifyEmail } from "../controller/email-verification/verifyEmailController.js";
import { resendVerificationEmail } from "../controller/email-verification/resendVerificationEmail.js";
const router = Router();

router.route("/verify-email").get(getVerificationEmailPage).post(verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);


export default router;