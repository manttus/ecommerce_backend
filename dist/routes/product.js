"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product-controller");
const validateToken_1 = require("../validation/validateToken");
const productRouter = (0, express_1.Router)();
productRouter.get('/', product_controller_1.getProductController);
productRouter.post('/', validateToken_1.validateToken, product_controller_1.addProductController);
productRouter.patch('/:id');
productRouter.delete('/:id', validateToken_1.validateToken, product_controller_1.deleteProductController);
exports.default = productRouter;