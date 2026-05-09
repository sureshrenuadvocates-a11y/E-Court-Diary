import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import AuthRoutes from "../Routes/AuthRoutes.js";
import EdiaryRoutes from "../Routes/EdiaryRoutes.js";
import ConnectDB from "../Utlis/db.js";
import cookieParser from 'cookie-parser';
import "../Utlis/TwillioSender.js"
import session from 'express-session';
import MongoStore from 'connect-mongo';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/api/auth", AuthRoutes);
app.use("/api/ediary", EdiaryRoutes);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    ConnectDB();
});
