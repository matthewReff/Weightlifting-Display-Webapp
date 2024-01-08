import { Express } from "express";
import bodyWeight from "./body-weight";
import exerciseMax from "./measured-max";
import estimatedMax from "./estimated-max";

export const mountDataRoutes = (app: Express) => {
  const dataFunctions = [
    bodyWeight,
    exerciseMax,
    estimatedMax
  ];

  for(const func of dataFunctions) {
    app.use("/data", func);
  }
}