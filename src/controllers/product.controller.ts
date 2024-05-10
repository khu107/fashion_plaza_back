import { AdminRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import { ProductInput } from "../libs/types/product";
import ProductService from "../models/Product.service";

const productService = new ProductService();
const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();

    res.status(200).json({ products: data });
  } catch (err) {
    console.log("Error, getAllProducts", err);
    res.status(404).json(err);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
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

export default productController;
