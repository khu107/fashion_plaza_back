import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;
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
