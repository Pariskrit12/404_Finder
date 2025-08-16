import connectDB from "./db/connection.js";
import { app } from "./app.js";
import { createServer } from "http";
import dotenv from "dotenv";
const server = createServer(app);
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server Connected Successfully At Port ${process.env.PORT}`);//server runs only if database is connected
    });
  })
  .catch((err) => {
    console.log(err);
  });
