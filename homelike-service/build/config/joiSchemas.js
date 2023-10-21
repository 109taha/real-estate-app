"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemas = {
    apartmentCREATE: joi_1.default.object({
        name: joi_1.default.string().max(50).required(),
        description: joi_1.default.string().max(500).optional(),
        price: joi_1.default.number().min(0).required(),
        address: joi_1.default.string().optional(),
        city: joi_1.default.string().max(500).required(),
        country: joi_1.default.string().max(50).required(),
        rooms: joi_1.default.number().min(1).required(),
        location: joi_1.default.object({
            coordinates: joi_1.default.array().items(joi_1.default.number()).min(2).max(2),
        }),
    }),
    apartmentUPDATE: joi_1.default.object({
        name: joi_1.default.string().max(50).optional(),
        description: joi_1.default.string().max(500).optional(),
        price: joi_1.default.number().min(0).optional(),
        address: joi_1.default.string().optional(),
        city: joi_1.default.string().max(500).optional(),
        country: joi_1.default.string().max(50).optional(),
        rooms: joi_1.default.number().min(1).optional(),
        location: joi_1.default.object({
            coordinates: joi_1.default.array().items(joi_1.default.number()).min(2).max(2),
        }).optional(),
    }),
    apartmentSEARCH: joi_1.default.object({
        city: joi_1.default.string().max(500).optional(),
        country: joi_1.default.string().max(50).optional(),
        rooms: joi_1.default.number().min(1).optional(),
        price: joi_1.default.number().min(0).optional(),
        nearest: joi_1.default.number().min(0),
        longitude: joi_1.default.number().min(-180).max(180),
        latitude: joi_1.default.number().min(-90).max(90),
    }).with('nearest', 'longitude').with('nearest', 'latitude'),
    userREGISTER: joi_1.default.object({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    userAUTHENTICATE: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.default = schemas;
//# sourceMappingURL=joiSchemas.js.map