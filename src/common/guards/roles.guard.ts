import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StaffRole } from '../../interfaces/staff.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload } from './auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<StaffRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user) throw new ForbiddenException('Unauthorized access');

    const isAuthorized = requiredRoles.some((role) =>
      user?.role?.includes(role),
    );

    if (isAuthorized) return true;
    throw new UnauthorizedException('Access restricted');
  }
}
