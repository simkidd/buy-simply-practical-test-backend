import { Controller, Delete, Get, Param, Query, Req } from '@nestjs/common';
import { LoansService } from './loans.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { StaffRole } from '../../interfaces/staff.interface';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get('/')
  getLoans(@Req() req, @Query('status') status?: string) {
    const role = req.user.role as StaffRole;

    if (status) {
      return this.loansService.filterByStatus(status, role);
    }

    return this.loansService.getAll(role);
  }

  @Get('/:userEmail/get')
  getUserLoans(@Param('userEmail') email: string) {
    return this.loansService.getByUserEmail(email);
  }

  @Get('/expired')
  getExpiredLoans() {
    return this.loansService.getExpired();
  }

  @Delete('/:loanId/delete')
  @Roles('superAdmin')
  deleteLoan(@Param('loanId') id: string) {
    return this.loansService.deleteLoan(id);
  }
}
