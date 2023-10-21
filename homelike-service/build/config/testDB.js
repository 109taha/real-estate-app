"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDatabase = exports.closeDatabase = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongod = new mongodb_memory_server_1.MongoMemoryServer();
const connect = async () => {
    const uri = await mongod.getUri();
    const mongooseOpts = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    await mongoose_1.default.connect(uri, mongooseOpts);
};
exports.connect = connect;
const closeDatabase = async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
    await mongod.stop();
};
exports.closeDatabase = closeDatabase;
const clearDatabase = async () => {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
exports.clearDatabase = clearDatabase;
//# sourceMappingURL=testDB.js.map