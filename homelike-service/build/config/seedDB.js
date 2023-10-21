"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const apartment_model_1 = require("../models/apartment.model");
const seeder = async () => {
    const isSeeded = await user_model_1.User.find({ email: "john.doe@gmail.com" });
    if (isSeeded.length > 0) {
        return;
    }
    const user = new user_model_1.User({
        first_name: "John",
        last_name: "Doe",
        email: "john.doee@gmail.com",
    });
    user.setPassword("qwerty");
    await user.save();
    const apartmentsData = [
        {
            name: "Test Apartment 1",
            description: "Description 1",
            price: 700,
            address: "Address 1",
            city: "Madrid",
            country: "Spain",
            rooms: 4,
            location: {
                coordinates: [-3.6579665344820147, 40.45411542600425], //≈5KM From center of Madrid
            },
            createdBy: user._id,
        },
        {
            name: "Test Apartment 2",
            description: "Description 2",
            price: 1300,
            address: "Address 2",
            city: "Madrid",
            country: "Spain",
            rooms: 4,
            location: {
                coordinates: [-3.866739672129899, 40.36293077608068], //≈15KM From center of Madrid
            },
            createdBy: user._id,
        },
        {
            name: "Test Apartment 3",
            description: "Description 3",
            price: 500,
            address: "Address 3",
            city: "Madrid",
            country: "Spain",
            rooms: 4,
            location: {
                coordinates: [-3.4551137556790623, 40.291157800189296], //≈25KM From center of Madrid
            },
            createdBy: user._id,
        }
    ];
    const apartments = await apartment_model_1.Apartment.create(apartmentsData);
    user.favorites.push(apartments[1]._id);
    user.favorites.push(apartments[2]._id);
    await user.save();
};
exports.default = seeder;
//# sourceMappingURL=seedDB.js.map