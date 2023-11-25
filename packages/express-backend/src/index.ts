import express, { Request, Response, NextFunction } from "express";
import helloApiRoutes from "./endpoints/hello";

const app = express();
const port = 3001;

app.use(express.json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Something on the server failed");
});

app.use("/hello", helloApiRoutes);


app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
})