import express from "express";
import cookieParser from "cookie-parser"

const app = express();
app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20Kb",
  })
);

app.use(cookieParser())

import userRouter from "./routes/user.routes.js";
app.use("/api", userRouter);

export { app };
