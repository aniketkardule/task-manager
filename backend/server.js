import express from "express";

import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();
import connectDb from "./config/db.js";
import cookies  from "cookie-parser";


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "PATCH", "HEAD", "DELETE"],
      credentials: true,
    })
  );
  
app.use(cookies());
app.use(cookieParser())

connectDb();

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/users", router);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})