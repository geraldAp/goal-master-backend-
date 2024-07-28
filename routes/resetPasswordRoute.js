import { Router } from "express";
const router = Router();
import { ResetPasswordLink, resetPassword } from "../controller/passwordReset/forgotPasswordController.js";
import authMiddleWare from "../middleware/verifyJwt.js";
import { changePassword } from "../controller/passwordReset/changePasswordController.js";

router.post("/forgot-password-reset-link", ResetPasswordLink);
router.put("/forgot-password-reset", resetPassword);
router.use(authMiddleWare);
router.put("/change-password", changePassword);

export default router;
