import { Router } from "express";
import { getProductController, addProductController, deleteProductController } from "../controller/product-controller";
import { validateToken } from "../validation/validateToken";
const productRouter = Router();

productRouter.get('/', getProductController);
productRouter.post('/', validateToken, addProductController);
productRouter.patch('/:id');
productRouter.delete('/:id', validateToken, deleteProductController);

export default productRouter;
