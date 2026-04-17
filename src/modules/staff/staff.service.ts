import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IStaff } from '../../interfaces/staff.interface';

@Injectable()
export class StaffService {
  private staff: IStaff[];

  constructor() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'staffs.json');

    const data = fs.readFileSync(filePath, 'utf-8');
    this.staff = JSON.parse(data) as IStaff[];
  }

  findByEmail(email: string): IStaff | undefined {
    return this.staff.find((user) => user.email === email);
  }
}
