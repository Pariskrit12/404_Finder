import { Router } from "express";
import {
  loginUser,
  userRegister,
  sendMessage,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/userRegister").post(userRegister);
router.route("/login").post(loginUser);

router.route("/message").get(verifyJwt, sendMessage);

//protected routes
router.route("/logout").post(verifyJwt,logoutUser)
export default router;
