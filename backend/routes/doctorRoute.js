import express from "express";
import { doctorList } from "../controllers/doctorController.js";

const doctorRoute = express.Router();

doctorRoute.get("/list", doctorList);

export default doctorRoute;
