import { Router } from "express";
import { getProductController, addProductController, deleteProductController, updateProductController } from "../controller/product-controller";
import { validateToken } from "../validation/validateToken";
const productRouter = Router();

productRouter.get('/', getProductController);
productRouter.post('/', validateToken, addProductController);
productRouter.patch('/:id', validateToken, updateProductController);
productRouter.delete('/:id', validateToken, deleteProductController);

export default productRouter;
