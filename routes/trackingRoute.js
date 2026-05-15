import { Router } from "express";
import { createTrackingEvent, getTrackingBySupplier } from "../controllers/tracking.js";

const trackingRoute = Router();

trackingRoute.post("/create", createTrackingEvent);
trackingRoute.get("/events/supplier/:supplierToken", getTrackingBySupplier);

export default trackingRoute;