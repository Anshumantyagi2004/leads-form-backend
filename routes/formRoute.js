import { Router } from "express";
import { createForm, getFormBySupplierToken, getLastForm } from "../controllers/form.js";
const formRoute = Router();

formRoute.post("/add", createForm);
formRoute.get("/get-last-form", getLastForm)
formRoute.get("/get-forms/:supplierToken", getFormBySupplierToken)

export default formRoute;