import express from "express";
import bodyParser from "body-parser";
import employeeRoutes from "./routes/employees.route";

const app = express();
const port = 3000;

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
  console.log(`server is listening on http://localhost:${port}....`);
});
