import { Router } from "express";
import makeUploader from "./libs/utils/uploader";
import adminController from "./controllers/admin.controller";
import memberController from "./controllers/member.controller";
const routerAdmin = Router();

// user
routerAdmin.get("/user/all", adminController.getUsers);
routerAdmin.post("/user/edit", adminController.updateChosenUser);

// Product
routerAdmin.get("/product/all", adminController.getAllProducts);

routerAdmin.post(
  "/product/create",
  makeUploader("products").array("productImages", 3),
  adminController.createNewProduct
);

export default routerAdmin;
