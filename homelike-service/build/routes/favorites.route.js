"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const favorite_controller_1 = __importDefault(require("../controllers/favorite.controller"));
const router = (0, express_1.Router)();
router.post("/:id", passport_1.default.authenticate('jwt', { session: false }), favorite_controller_1.default.mark);
router.get("/", passport_1.default.authenticate('jwt', { session: false }), favorite_controller_1.default.list);
exports.default = router;
//# sourceMappingURL=favorites.route.js.map