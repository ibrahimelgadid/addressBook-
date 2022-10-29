//---------------------------------------------|
//           All required modules
//---------------------------------------------|
import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import * as dotenv from "dotenv";
import "colors";
import mongoose from "mongoose";
import morgan from "morgan";

//---------------------------------------------|
//                USE CONFIGS
//---------------------------------------------|
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
app.use(cors());

//---------------------------------------------|
//              DatabaseConnection
//---------------------------------------------|
mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("database is connected".cyan))
  .catch((err) => console.log(err));

//---------------------------------------------|
//              IMPORT ROUTES
//---------------------------------------------|
import auth from "./routes/authRoute";
import contact from "./routes/contactRoutes";

//---------------------------------------------|
//                 USE ROUTE
//---------------------------------------------|
app.use("/auth", auth);
app.use("/contacts", contact);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Auth app is serve on ${PORT}`.cyan));
