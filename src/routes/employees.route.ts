import { Router, Request, Response } from "express";
import pool from "../config/db";

const router = Router();

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const employees = await pool.query("SELECT * FROM employees");
    res.status(200).json({
      message: "Employees fetched successfully",
      data: employees.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const employeeID = parseInt(req.params.id, 10);
  const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
    employeeID,
  ]);
  res
    .status(200)
    .json({ message: "Employee fetched successfully", data: employee.rows });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, position, salary } = req.body;
  const employee = await pool.query(
    "INSERT INTO employees (name, position, salary) VALUES ($1, $2, $3) RETURNING *",
    [name, position, salary]
  );
  res
    .status(201)
    .json({ message: "Employee created successfully", data: employee.rows });
});

router.put("/:id", async (req: Request, res: Response) => {
  const employeeID = parseInt(req.params.id, 10);
  const { name, position, salary } = req.body;
  const employee = await pool.query(
    "UPDATE employees SET name = $1, position = $2, salary = $3 WHERE id = $4 RETURNING *",
    [name, position, salary, employeeID]
  );
  res.status(200).json({
    message: `Employee ${employeeID} updated successfully`,
    data: employee.rows,
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const employeeID = parseInt(req.params.id, 10);
  await pool.query("DELETE FROM employees WHERE id = $1", [employeeID]);
  res
    .status(200)
    .json({ message: `Employee ${employeeID} deleted successfully` });
});

export default router;
