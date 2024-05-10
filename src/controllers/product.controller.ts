import { AdminRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import { ProductInput } from "../libs/types/product";
import ProductService from "../models/Product.service";

const productService = new ProductService();
const productController: T = {};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");

    const data: ProductInput = req.body;
    await productService.createNewProduct(data);
    res.send("Sucessful creation!");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export default productController;
