import express, { NextFunction, Request, Response } from "express";
import { mountDataRoutes } from "./endpoints/data";

const app = express();
const port = 3001;

app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("Something on the server failed");
  });

mountDataRoutes(app);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});