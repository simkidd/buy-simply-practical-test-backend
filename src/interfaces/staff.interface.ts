export type StaffRole = 'staff' | 'admin' | 'superAdmin';

export interface IStaff {
  id: string;
  name: string;
  email: string;
  password: string;
  role: StaffRole;
}
