import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;
  }

  public async getAllProducts(): Promise<any[]> {
    // kirib kelayotgan stringni objectid uzgartirish kerak

    const result = await this.productModel.find();
    if (!result) throw new Error("NO_DATA_FOUND");

    return result;
  }
  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return (await this.productModel.create(input)).toObject();
    } catch (error) {
      console.error("Error, model: createNewProduct", error);
      throw new Error("CREATE_FAILED");
    }
  }
}

export default ProductService;
