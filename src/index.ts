import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "express-async-errors";

import employeeRoutes from "./routes/employees.route";
import { errorHandler } from "./middlewares/errorHandler";
import { HttpStatusCode } from "./constants/httpStatusCode";

const app = express();
const port = 3000;

// const allowedOrigins = ["http://localhost:3000", "http://localhost:30100"];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api/employees", employeeRoutes);

app.get("/ping", (req, res) => {
  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Tommy IYKRA api server is running",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
