import express from "express";
import { AdminController } from "@/controllers/AdminController/index.js";

export const adminRouter = express.Router();

adminRouter.get("/healthcheck", AdminController.healthcheck);

adminRouter.post("/csp-violation", AdminController.cspViolation);
