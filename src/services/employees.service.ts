import pool from "../config/db";

export default class EmployeesService {
  static async getAllEmployees(): Promise<any> {
    const employees = await pool.query("SELECT * FROM employees");
    return employees.rows;
  }

  static async getEmployeeById(employeeID: number): Promise<any> {
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
      employeeID,
    ]);
    return employee.rows[0];
  }

  static async createEmployee({
    name,
    position,
    salary,
  }: {
    name: string;
    position: string;
    salary: number;
  }): Promise<any> {
    const employee = await pool.query(
      "INSERT INTO employees (name, position, salary) VALUES ($1, $2, $3) RETURNING *",
      [name, position, salary]
    );

    return employee.rows[0];
  }

  static async updateEmployee(
    employeeID: number,
    {
      name,
      position,
      salary,
    }: { name: string; position: string; salary: number }
  ): Promise<any> {
    const employee = await pool.query(
      "UPDATE employees SET name = $1, position = $2, salary = $3 WHERE id = $4 RETURNING *",
      [name, position, salary, employeeID]
    );
    return employee.rows[0];
  }

  static async deleteEmployee(employeeID: number): Promise<any> {
    await pool.query("DELETE FROM employees WHERE id = $1", [employeeID]);
  }
}
