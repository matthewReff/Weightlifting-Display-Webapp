import express from "express";
import helloApiRoutes from "./endpoints/hello";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/hello", helloApiRoutes);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
})