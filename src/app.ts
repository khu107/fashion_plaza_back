import express, { Application } from "express";
import cors from "cors";
import path from "path";
import router from "./router";
// import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
// import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "session",
});

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

// 2 - SESSIONS
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 6, // 6h
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// 3 - VIEWS

// 4 - ROUTERS

app.use("/", router); // SPA: REACT
export default app;
