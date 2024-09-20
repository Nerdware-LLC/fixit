import express from "express";
import { WebhooksController } from "@/controllers/WebhooksController/index.js";

export const webhooksRouter = express.Router();

webhooksRouter.use("/stripe", WebhooksController.stripeWebhooks);
