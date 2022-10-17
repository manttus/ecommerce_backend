"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token)
        return res.status(401).send({ message: "Access Denied" });
    const onlyToken = token.split(' ')[1];
    jsonwebtoken_1.default.verify(onlyToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(400).send({ messssage: "Invalid Token" });
        }
        else {
            req.body.user = user;
            next();
        }
    });
};
exports.validateToken = validateToken;
