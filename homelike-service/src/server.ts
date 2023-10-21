import "dotenv/config";
import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";
import seeder from "./config/seedDB";

const port = process.env.SERVER_PORT;
const mongo_url = process.env.DBURL;

(async () => {
  try {
    mongoose
      .connect(mongo_url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
      } as ConnectOptions)
      .then(async () => {
        await seeder();
        app.listen(port, () => {
          console.log(`🚀 The application is listening on port http://localhost:${port}/api/`);
        });
      })
      .catch((error) => {
        throw Error(`❌ Database Connection Error: ${error}`);
      });
  } catch (error) {
    throw Error(`❌ Server Connection Error: ${error}`);
  }
})();
