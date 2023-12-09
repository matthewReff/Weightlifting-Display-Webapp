import express, { NextFunction, Request, Response } from "express";
import { mountDataRoutes } from "./endpoints/data";
import cors from "cors";
import { BASE_API_URL, BASE_APP_URL } from "./constants";

const app = express();
const port = 3001;

app.use(express.json());
const corsOptions = {
  origin: BASE_API_URL,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Something on the server failed");
});
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", BASE_APP_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mountDataRoutes(app);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});