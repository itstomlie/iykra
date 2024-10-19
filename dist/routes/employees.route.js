"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const employees = await db_1.default.query("SELECT * FROM employees");
    res
        .status(200)
        .json({ message: "Employees fetched successfully", data: employees.rows });
});
router.get("/:id", async (req, res) => {
    const employeeID = parseInt(req.params.id, 10);
    const employee = await db_1.default.query("SELECT * FROM employees WHERE id = $1", [
        employeeID,
    ]);
    res
        .status(200)
        .json({ message: "Employee fetched successfully", data: employee.rows });
});
router.post("/", async (req, res) => {
    const { name, position, salary } = req.body;
    const employee = await db_1.default.query("INSERT INTO employees (name, position, salary) VALUES ($1, $2, $3) RETURNING *", [name, position, salary]);
    res
        .status(201)
        .json({ message: "Employee created successfully", data: employee.rows });
});
router.put("/:id", async (req, res) => {
    const employeeID = parseInt(req.params.id, 10);
    const { name, position, salary } = req.body;
    const employee = await db_1.default.query("UPDATE employees SET name = $1, position = $2, salary = $3 WHERE id = $4 RETURNING *", [name, position, salary, employeeID]);
    res.status(200).json({
        message: `Employee ${employeeID} updated successfully`,
        data: employee.rows,
    });
});
router.delete("/:id", async (req, res) => {
    const employeeID = parseInt(req.params.id, 10);
    await db_1.default.query("DELETE FROM employees WHERE id = $1", [employeeID]);
    res
        .status(200)
        .json({ message: `Employee ${employeeID} deleted successfully` });
});
exports.default = router;
