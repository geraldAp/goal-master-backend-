import { Router } from "express";
const router = Router();
import refreshController from "../controller/auth/refreshController.js";
import LoginController from "../controller/auth/loginController.js";
import signUpController from "../controller/auth/signupcontroller.js";
import logoutController from "../controller/auth/logoutController.js";
import { getAccounts, deleteAccounts } from "../controller/accounts.js";


router.post("/sign-up", signUpController);
router.post("/login", LoginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshController);
router.delete("/delete-accounts", deleteAccounts);
router.get("/get-accounts", getAccounts);
export default router;
