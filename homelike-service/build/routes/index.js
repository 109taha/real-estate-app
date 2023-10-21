"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = __importDefault(require("./users.route"));
const apartments_route_1 = __importDefault(require("./apartments.route"));
const favorites_route_1 = __importDefault(require("./favorites.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../swagger"));
const graphql_route_1 = __importDefault(require("./graphql.route"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("OK!");
});
router.use('/swagger', swagger_ui_express_1.default.serve);
router.get('/swagger', swagger_ui_express_1.default.setup(swagger_1.default));
router.use("/graphql", graphql_route_1.default);
router.use("/users", users_route_1.default);
router.use("/apartments", apartments_route_1.default);
router.use("/favorites", favorites_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map