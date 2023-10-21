"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../midddlewares/validator"));
const joiSchemas_1 = __importDefault(require("../config/joiSchemas"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
router.post("/register", (0, validator_1.default)(joiSchemas_1.default.userREGISTER, "body"), user_controller_1.default.register);
router.post("/authenticate", (0, validator_1.default)(joiSchemas_1.default.userAUTHENTICATE, "body"), user_controller_1.default.authenticate);
exports.default = router;
//# sourceMappingURL=users.route.js.map