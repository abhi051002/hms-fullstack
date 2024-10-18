import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// Api Endpoints
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.status(200).send("API Working");
});

app.listen(port, () => console.log("Server Started ", port));
