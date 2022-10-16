"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.CONNECT, (err) => {
    if (err) {
        console.log({ message: err });
    }
    else {
        console.log({ message: "Connect Successfully" });
    }
});
app.use((0, body_parser_1.json)());
app.use('/auth', auth_1.default);
app.use('/', (req, res) => res.send({ message: "Server Started" }));
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(process.env.PORT, () => {
    console.log({ message: `Server Started at ${process.env.PORT}` });
});
