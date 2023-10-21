"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const apartment_controller_1 = __importDefault(require("../controllers/apartment.controller"));
const validator_1 = __importDefault(require("../midddlewares/validator"));
const joiSchemas_1 = __importDefault(require("../config/joiSchemas"));
const router = (0, express_1.Router)();
router.get("/", (0, validator_1.default)(joiSchemas_1.default.apartmentSEARCH, "query"), apartment_controller_1.default.search);
router.get("/:id", apartment_controller_1.default.searchById);
router.post("/", passport_1.default.authenticate("jwt", { session: false }), (0, validator_1.default)(joiSchemas_1.default.apartmentCREATE, "body"), apartment_controller_1.default.create);
router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), (0, validator_1.default)(joiSchemas_1.default.apartmentUPDATE, "body"), apartment_controller_1.default.update);
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), apartment_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=apartments.route.js.map