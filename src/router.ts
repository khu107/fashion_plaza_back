import { Router } from "express";
import memberController from "./controllers/member.controller";
import adminController from "./controllers/admin.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
const router = Router();

// Admin
router.post(
  "/admin/signup",
  makeUploader("members").single("memberImage"),
  adminController.proccessSignup
);

router.post("/admin/login", adminController.proccessLogin);

router.get("/admin/logout", adminController.logout);

router.get("/check-me", adminController.checkAuthSession);

// Member
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);

// Product

router.post(
  "/product/create",
  adminController.verifyAdmin,
  makeUploader("products").array("productImages", 3),
  productController.createNewProduct
);

router.get(
  "/product/all",
  adminController.verifyAdmin,
  productController.getAllProducts
);

// Users
router.get("/user/all", adminController.verifyAdmin, adminController.getUsers);
router.post(
  "/user/edit",
  adminController.verifyAdmin,
  adminController.updateChosenUser
);

export default router;
