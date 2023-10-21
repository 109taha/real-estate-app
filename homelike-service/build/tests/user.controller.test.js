"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const dbHandler = __importStar(require("../config/testDB"));
beforeAll(async () => {
    await dbHandler.connect();
}, 30000);
afterEach(async () => {
    await dbHandler.clearDatabase();
}, 30000);
afterAll(async () => {
    await dbHandler.closeDatabase();
}, 30000);
describe('User test', () => {
    it('can be created correctly', async () => {
        expect.assertions(2);
        const user = new user_model_1.User({
            first_name: "test name",
            last_name: "test lastname",
            email: "test@gmail.com"
        });
        user.setPassword("blablabla");
        await user.save();
        const UserInDb = await user_model_1.User.findOne({ email: "test@gmail.com" }).exec();
        console.log('User document from memory-db', UserInDb);
        expect(UserInDb.email).toEqual('test@gmail.com');
        expect(UserInDb.first_name).toEqual('test name');
    });
});
//# sourceMappingURL=user.controller.test.js.map