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
exports.loginController = exports.signupController = exports.createAdmin = exports.refreshAccessController = void 0;
const user_1 = __importDefault(require("../modals/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../modals/admin"));
const refreshAccessController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.token === null)
        return res.send({ message: "Invalid Token" });
    jsonwebtoken_1.default.verify(req.body.token, process.env.REFRESH, (err, user) => {
        if (err)
            return res.send({ message: "Invalid Token", error: err });
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '70s' });
        res.status(201).send({ accessToken, message: "Access Token Generated" });
    });
});
exports.refreshAccessController = refreshAccessController;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_1.default.findOne({ email: req.body.email });
    if (admin) {
        return res.send({ message: "Account Already Exists" });
    }
    const newAdmin = new admin_1.default(req.body);
    newAdmin.save();
    res.status(201).send({ message: "Account Created Successfully" });
});
exports.createAdmin = createAdmin;
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.send({ message: "Account Already Exists" });
    }
    const newUser = new user_1.default(req.body);
    newUser.save();
    res.status(201).send({ message: "Account Created Successfully" });
});
exports.signupController = signupController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        // const newUser = new User(req.body);
        // newUser.save();
        return res.status(404).send({ message: "Invalid Account" });
    }
    const accessToken = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.SECRET, { expiresIn: "70s" });
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.REFRESH);
    // const account = new User(req.body);
    // account.save();
    res.status(201).send({ accessToken, refreshToken, message: "Successful" });
});
exports.loginController = loginController;
