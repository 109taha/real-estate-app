"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apartment_model_1 = require("../models/apartment.model");
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const user_model_1 = require("../models/user.model");
const controller = {
    create: async (req, res) => {
        try {
            const apartmentData = { ...req.body, createdBy: req.user._id };
            const apartment = new apartment_model_1.Apartment(apartmentData);
            await apartment.save();
            return res.status(http_status_1.default.CREATED).send({ success: true, apartment });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment ID is not valid" });
            }
            const updated = await apartment_model_1.Apartment.findOneAndUpdate({
                _id: req.params.id,
                createdBy: req.user._id,
            }, {
                ...req.body,
                location: {
                    type: "Point",
                    coordinates: req.body.location.coordinates,
                },
            });
            const apartment = await apartment_model_1.Apartment.findById(updated._id);
            if (!updated && !apartment) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment not found" });
            }
            return res.status(http_status_1.default.OK).send({ success: true, apartment });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment ID is not valid" });
            }
            const apartment = await apartment_model_1.Apartment.findById(req.params.id);
            if (!apartment) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment not found" });
            }
            const user = await user_model_1.User.findById(req.user._id);
            const removed = await apartment.remove();
            if (user && removed) {
                const index = user.favorites.indexOf(apartment._id);
                user.favorites.splice(index, 1);
                await user.save();
            }
            return res
                .status(http_status_1.default.OK)
                .send({ success: true });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
    searchById: async (req, res) => {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment ID is not valid" });
            }
            const apartment = await apartment_model_1.Apartment.findById(req.params.id);
            if (!apartment) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ success: false, message: "Apartment not found" });
            }
            return res.status(http_status_1.default.OK).send({ success: true, apartment });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
    search: async (req, res) => {
        let filters = {};
        req.query.city
            ? (filters = { ...filters, city: String(req.query.city) })
            : filters;
        req.query.country
            ? (filters = { ...filters, country: String(req.query.country) })
            : filters;
        req.query.rooms
            ? (filters = { ...filters, rooms: { $gte: Number(req.query.rooms) } })
            : filters;
        req.query.price
            ? (filters = { ...filters, price: { $gte: Number(req.query.price) } })
            : filters;
        if (req.query.nearest && req.query.longitude && req.query.latitude) {
            filters = {
                ...filters,
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [
                                Number(req.query.longitude),
                                Number(req.query.latitude),
                            ],
                        },
                        $maxDistance: Number(req.query.nearest) * 1000,
                    },
                },
            };
        }
        try {
            const apartments = await apartment_model_1.Apartment.find(filters)
                .populate("createdBy", "name")
                .exec();
            res.status(http_status_1.default.OK).send({ success: true, apartments: apartments });
        }
        catch (error) {
            return res
                .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                .send({ success: false, message: error.message });
        }
    },
};
exports.default = controller;
//# sourceMappingURL=apartment.controller.js.map