import { AdminRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import { ProductInput } from "../libs/types/product";
import ProductService from "../models/Product.service";

const productService = new ProductService();
const productController: T = {};

export default productController;
