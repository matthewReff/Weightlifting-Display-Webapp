import { Express } from "express";
import bodyWeight from "./body-weight"

export const mountDataRoutes = (app: Express) => {
    app.use("/data", bodyWeight);
}