interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

interface CreateEmployee {
  name: string;
  position: string;
  salary: number;
}

interface UpdateEmployee extends Partial<CreateEmployee> {}

export { Employee, CreateEmployee, UpdateEmployee };
