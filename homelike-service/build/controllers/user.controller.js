"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const http_status_1 = __importDefault(require("http-status"));
const controller = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            if (await user_model_1.User.findOne({ email })) {
                return res.status(http_status_1.default.CONFLICT).json({
                    message: "User already exists"
                });
            }
            const user = new user_model_1.User({
                first_name,
                last_name,
                email,
            });
            user.setPassword(password);
            await user.save();
            res.json({ success: true, ...user.authJSON() });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
    authenticate: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await user_model_1.User.findOne({ email });
            if (!user || !user.validPassword(password)) {
                res.status(http_status_1.default.UNAUTHORIZED).json({
                    message: "Invalid email and password combination",
                });
            }
            else {
                res.json({ success: true, ...user.authJSON() });
            }
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
};
exports.default = controller;
//# sourceMappingURL=user.controller.js.map