import { NextFunction, Request, Response } from "express";

import EmployeesService from "../services/employees.service";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { Employee } from "../interfaces/employee.interface";

export default class EmployeesControllerV2 {
  static async getAllEmployees(
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
}
