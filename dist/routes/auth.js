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
const express_1 = require("express");
const user_1 = __importDefault(require("../modals/user"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_1.default.findOne({ email: req.body.email });
    if (!exists) {
        const newUser = new user_1.default(req.body);
        newUser.save();
    }
    // const account = new User(req.body);
    // account.save();
    res.send({ message: "Account Created Succefully" });
}));
exports.default = authRouter;
