import { Router } from "express";
import memberController from "./controllers/member.controller";
import adminController from "./controllers/admin.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
const router = Router();

//   makeUploader("members").single("memberImage"),

// Member
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);
router.post("/member/logout", memberController.logout);

export default router;
