
import { w2Employees } from './w2Employees';
import { contractorEmployees } from './contractorEmployees';
import { perDiemEmployees } from './perDiemEmployees';
import { Employee } from "@/types/employee";

/**
 * Combined mock data for all employee types
 */
export const mockEmployees: Employee[] = [
  ...w2Employees,
  ...contractorEmployees,
  ...perDiemEmployees
];

export {
  w2Employees,
  contractorEmployees,
  perDiemEmployees
};
