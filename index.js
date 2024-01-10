import express from "express";
import mongoose from "mongoose";
import path from "path"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { restrictToLoggedinUserOnly } from "./src/middleware/auth.js";
import { handleUserLogin, handleUserSignup } from "./src/controller/auth.js";
import URLRouter from "./src/routes/url.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to the mongodb"))
.catch((err) => console.log("Error connecting to the mongodb: ", err))

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get("/signup", (req, res) => {
    return res.render("signup");
});

app.post("/signup", handleUserSignup);

app.get("/login", (req, res) => {
    return res.render("login");
});

app.post("/login", handleUserLogin);

app.use("/", restrictToLoggedinUserOnly, URLRouter);


app.listen(process.env.PORT, () => console.log("Connected to the server"));