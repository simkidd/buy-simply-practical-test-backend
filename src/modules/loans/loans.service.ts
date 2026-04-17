import { Injectable } from '@nestjs/common';
import { ILoan } from '../../interfaces/loan.interface';
import { StaffRole } from '../../interfaces/staff.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoansService {
  private loans: ILoan[];

  constructor() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'loans.json');

    const data = fs.readFileSync(filePath, 'utf-8');
    this.loans = JSON.parse(data) as ILoan[];
  }

  getAll(role: StaffRole) {
    if (role === 'staff') {
      return this.loans.map((loan) => ({
        ...loan,
        applicant: {
          name: loan.applicant.name,
          email: loan.applicant.email,
          telephone: loan.applicant.telephone,
        },
      }));
    }

    return this.loans;
  }

  filterByStatus(status: string, role: StaffRole) {
    const filtered = this.loans.filter((l) => l.status === status);

    if (role === 'staff') {
      return filtered.map((loan) => ({
        ...loan,
        applicant: {
          name: loan.applicant.name,
          email: loan.applicant.email,
          telephone: loan.applicant.telephone,
        },
      }));
    }

    return filtered;
  }

  getByUserEmail(email: string) {
    const userLoans = this.loans.filter((l) => l.applicant.email === email);

    return { loans: userLoans };
  }

  getExpired() {
    const now = new Date();

    return this.loans.filter((l) => new Date(l.maturityDate) < now);
  }

  deleteLoan(id: string) {
    this.loans = this.loans.filter((l) => l.id !== id);

    return { message: 'Loan deleted successfully' };
  }
}
