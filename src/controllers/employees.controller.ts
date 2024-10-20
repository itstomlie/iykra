import { NextFunction, Request, Response } from "express";

import EmployeesService from "../services/employees.service";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { CreateEmployee, Employee } from "../interfaces/employee.interface";

export default class EmployeesController {
  static async getAllEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employees: Employee[] = await EmployeesService.getAllEmployees();
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Employees fetched successfully",
        data: employees,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllEmployeesV2(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employees: Employee[] = await EmployeesService.getAllEmployees();
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Employees fetched successfully V2",
        data: employees,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeeById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employeeID = parseInt(req.params.id, 10);
      const employee: Employee = await EmployeesService.getEmployeeById(
        employeeID
      );
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Employee fetched successfully",
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, position, salary }: CreateEmployee = req.body;

      const employee: Employee = await EmployeesService.createEmployee({
        name,
        position,
        salary,
      });

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employeeID = parseInt(req.params.id, 10);
      const { name, position, salary } = req.body;

      const employee: Employee = await EmployeesService.updateEmployee(
        employeeID,
        {
          name,
          position,
          salary,
        }
      );

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Employee updated successfully",
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employeeID = parseInt(req.params.id, 10);
      await EmployeesService.deleteEmployee(employeeID);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
