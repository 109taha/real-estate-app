"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const seedDB_1 = __importDefault(require("./config/seedDB"));
const port = process.env.SERVER_PORT;
const mongo_url = process.env.DBURL;
(async () => {
  try {
    mongoose_1.default
      .connect(mongo_url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(async () => {
        await (0, seedDB_1.default)();
        app_1.default.listen(port, () => {
          console.log(
            `🚀 The application is listening on port http://localhost:${port}/api/`
          );
        });
      })
      .catch((error) => {
        throw Error(`❌ Database Connection Error: ${error}`);
      });
  } catch (error) {
    throw Error(`❌ Server Connection Error: ${error}`);
  }
})();
//# sourceMappingURL=server.js.map
