"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const middleware = (schema, property) => {
    return (req, res, next) => {
        let data;
        switch (property) {
            case "body":
                data = req.body;
                break;
            case "query":
                data = req.query;
                break;
        }
        const { error } = schema.validate(data);
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details.map((i) => i.message).join(",");
            console.log("error", message);
            return res
                .status(http_status_1.default.UNPROCESSABLE_ENTITY)
                .json({ message: message });
        }
    };
};
exports.default = middleware;
//# sourceMappingURL=validator.js.map