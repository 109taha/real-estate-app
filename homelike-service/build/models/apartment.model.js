"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentSchema = exports.Apartment = void 0;
const mongoose_1 = require("mongoose");
const ApartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    address: {
        type: String,
        maxlength: 100,
    },
    city: {
        type: String,
        required: true,
        maxlength: 50,
    },
    country: {
        type: String,
        required: true,
        maxlength: 50,
    },
    rooms: {
        type: Number,
        required: true,
        min: 1,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
}, {
    timestamps: true,
});
exports.ApartmentSchema = ApartmentSchema;
ApartmentSchema.index({ location: "2dsphere" });
const Apartment = (0, mongoose_1.model)("Apartment", ApartmentSchema);
exports.Apartment = Apartment;
//# sourceMappingURL=apartment.model.js.map