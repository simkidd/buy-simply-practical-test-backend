import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../utils/config';
import { StaffService } from '../staff/staff.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, StaffService],
})
export class AuthModule {}
