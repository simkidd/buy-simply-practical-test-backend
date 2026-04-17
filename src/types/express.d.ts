import { JwtPayload } from '../common/guards/auth.guard';

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: JwtPayload;
    }
  }
}
