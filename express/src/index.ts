import express, { Request, Response } from "express";
import { router } from "./routes/login-routes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import "./controllers/login.controllers";
import { AppRouter } from "./app-router";

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({ keys: ["asa"] }));
app.use(AppRouter.getInstance());

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
