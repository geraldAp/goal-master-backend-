import { Router } from "express";
const router = Router();
import refreshController from "../controller/auth/refreshController";
import loginController from "../controller/auth/loginController";
import signUpController from "../controller/auth/signupcontroller";
import logoutController from "../controller/auth/logoutController";
import { getAccounts, deleteAccounts } from "../controller/accounts";


router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshController);
router.delete("/delete-accounts", deleteAccounts);
router.get("/get-accounts", getAccounts);
export default router;
