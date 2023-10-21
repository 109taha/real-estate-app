"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apartment_model_1 = require("../models/apartment.model");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../models/user.model");
const mongoose_1 = require("mongoose");
const controller = {
    mark: async (req, res) => {
        const userId = req.user._id;
        const favoriteId = req.params.id;
        try {
            if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment ID is not valid" });
            }
            const user = await user_model_1.User.findById(userId);
            const apartment = await apartment_model_1.Apartment.findById(favoriteId);
            if (apartment) {
                if (user.favorites.includes(favoriteId)) {
                    return res.status(http_status_1.default.BAD_REQUEST).json({
                        success: false,
                    });
                }
                user.favorites.push(apartment._id);
                await user.save();
                return res.status(http_status_1.default.OK).json({
                    success: true,
                    message: "Apartment added to favorites",
                    apartment: apartment,
                });
            }
            else {
                return res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    message: "Apartment not found",
                });
            }
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
    list: async (req, res) => {
        try {
            const userId = req.user._id;
            const user = await user_model_1.User.findById(userId).populate("favorites");
            return res
                .status(http_status_1.default.OK)
                .json({ success: true, favorites: (user === null || user === void 0 ? void 0 : user.favorites) || [] });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
};
exports.default = controller;
//# sourceMappingURL=favorite.controller.js.map