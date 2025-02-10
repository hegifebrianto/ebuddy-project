"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const app = (0, express_1.default)();
app.use((0, express_2.json)());
app.use('/', userRoutes_1.default);
app.use("/auth", authRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map