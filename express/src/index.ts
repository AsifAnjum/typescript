import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/login.controller";
import "./controllers/root.controller";
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
