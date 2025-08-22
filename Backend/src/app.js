import express from "express";
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

import userRouter from "./routes/user.routes.js";
app.use("/api", userRouter);

export { app };
