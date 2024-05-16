import { ExtendedRequest, MemberUpdateInput } from "../libs/types/member";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Request, Response } from "express";
import ProductService from "../models/Product.service";
import { ProductInput } from "../libs/types/product";

const memberService = new MemberService();
const productService = new ProductService();
const adminController: T = {};

adminController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    res.status(200).json({ users: result });
  } catch (err) {
    console.log("Error, getUsers", err);
    res.send(err);
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result: MemberUpdateInput = await memberService.updateChosenUser(
      req.body
    );
    res.status(200).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser", err);
    res.status(404).json(err);
  }
};

adminController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();

    res.status(200).json({ products: data });
  } catch (err) {
    console.log("Error, getAllProducts", err);
    res.status(404).json(err);
  }
};

adminController.createNewProduct = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");

    if (!req.files?.length) throw new Error("CREATE_FAILED");

    const data: ProductInput = req.body;

    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });
    await productService.createNewProduct(data);
    res.send("Sucessful creation!");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

adminController.createNewProduct = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");

    if (!req.files?.length) throw new Error("CREATE_FAILED");

    const data: ProductInput = req.body;

    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });
    await productService.createNewProduct(data);
    res.send("Sucessful creation!");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export default adminController;
