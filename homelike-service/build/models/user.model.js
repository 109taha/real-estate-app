"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const schema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash_password: {
        type: String,
        private: true,
    },
    salt: {
        type: String,
        private: true,
    },
    favorites: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Apartment" }],
}, {
    timestamps: true,
});
schema.virtual("name").get(function () {
    return `${this.first_name} ${this.last_name}`;
});
schema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString("hex");
    this.hash_password = crypto_1.default
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
};
schema.methods.validPassword = function (password) {
    const hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return this.hash_password === hash;
};
schema.methods.generateJWT = function () {
    return jsonwebtoken_1.default.sign({
        id: this.id,
        name: this.name,
        email: this.email,
    }, JWT_SECRET);
};
schema.methods.authJSON = function () {
    const { first_name, last_name, name, email } = this;
    return {
        name,
        first_name,
        last_name,
        email,
        token: this.generateJWT(),
    };
};
exports.User = (0, mongoose_1.model)("User", schema);
//# sourceMappingURL=user.model.js.map