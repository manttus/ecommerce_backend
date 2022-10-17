"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.addProductController = exports.getProductController = void 0;
const product_1 = __importDefault(require("../modals/product"));
const user_1 = __importDefault(require("../modals/user"));
const isAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById({ _id: id });
    if (!user.isAdmin) {
        return false;
    }
    return true;
});
const getProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    res.status(201).send({ products });
});
exports.getProductController = getProductController;
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminStatus = yield isAdmin(req.body.user._id);
    if (!adminStatus)
        return res.send({ message: "Not Authorized" });
    const newProduct = new product_1.default({
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        inStock: req.body.inStock
    });
    yield newProduct.save();
    res.status(201).send({ message: "Product Added" });
});
exports.addProductController = addProductController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminStatus = yield isAdmin(req.body.user._id);
    if (!adminStatus)
        return res.send({ message: "Not Authorized" });
    product_1.default.findByIdAndUpdate(req.params.id, {});
});
exports.updateProductController = updateProductController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminStatus = yield isAdmin(req.body.user._id);
    if (!adminStatus)
        return res.send({ message: "Not Authorized" });
    const product = yield product_1.default.findById({ _id: req.params.id });
    if (!product)
        return res.send({ message: "Invalid Product" });
    yield product_1.default.findByIdAndDelete({ _id: req.params.id });
    res.send({ message: "Product Deleted" });
});
exports.deleteProductController = deleteProductController;
