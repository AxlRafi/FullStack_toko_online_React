import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CartRoute from "./routes/CartRoute.js";
import SalesRoute from "./routes/SalesRoute.js";
import db from "./config/Database.js";
dotenv.config();
const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});
//Hanya digunakan diawal untuk membuat tabel
// (async () => {
//   await db.sync();
// })();
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(CartRoute);
app.use(SalesRoute);
// store.sync();
app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
