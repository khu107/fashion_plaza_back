import express, { Application } from "express";
import cors from "cors";
import path from "path";
import router from "./router";
import routerAdmin from "./admin-router";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// 1 - ENTRANCE
const app: Application = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

// 4 - ROUTERS

app.use("/admin", routerAdmin); // SPA: REACT admin
app.use("/", router); // SPA: REACT
export default app;
