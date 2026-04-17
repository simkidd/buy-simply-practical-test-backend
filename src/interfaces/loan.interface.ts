import { IApplicant } from './applicant.interface';

export type LoanStatus = 'pending' | 'active';

export interface ILoan {
  id: string;
  amount: string;
  maturityDate: string;
  status: LoanStatus;
  applicant: IApplicant;
  createdAt: string;
}

export interface SafeApplicant {
  name: string;
  email: string;
  telephone: string;
}

export interface SafeLoan {
  id: string;
  amount: string;
  maturityDate: string;
  status: LoanStatus;
  applicant: SafeApplicant;
  createdAt: string;
}
