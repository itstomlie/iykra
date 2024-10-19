"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const employees_route_1 = __importDefault(require("./routes/employees.route"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use("/api/employees", employees_route_1.default);
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}....`);
});
