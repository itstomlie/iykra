import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import employeeRoutes from "./routes/employees.route";
import { host, user, password, database } from "./config/config";

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

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(host, user, password, database);
  console.log(`server is listening on port ${port}`);
});
