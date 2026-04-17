import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { StaffService } from './modules/staff/staff.service';
import { StaffModule } from './modules/staff/staff.module';
import { LoansModule } from './modules/loans/loans.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [AuthModule, StaffModule, LoansModule],
  controllers: [AppController],
  providers: [
    AppService,
    StaffService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
