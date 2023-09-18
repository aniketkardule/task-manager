import express from "express";

import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();
import connectDb from "./config/db.js";

connectDb();


app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/users", router);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})