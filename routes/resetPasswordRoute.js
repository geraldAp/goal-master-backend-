import { Router } from "express";
const router = Router();
import { ResetPasswordLink, resetPassword } from "../controller/passwordReset/forgotPasswordController";
import authMiddleWare from "../middleware/verifyJwt";
import { changePassword } from "../controller/passwordReset/changePasswordController";

router.post("/forgot-password-reset-link", ResetPasswordLink);
router.put("/forgot-password-reset", resetPassword);
router.use(authMiddleWare);
router.put("/change-password", changePassword);

export default router;
