import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.authService.decodeToken(token);
      const isAdmin = await this.authService.verifyUserRole(
        decoded.id,
        'admin',
      );

      if (!isAdmin) {
        throw new ForbiddenException('Forbidden');
      }

      request.user = decoded.id;
    } catch (error) {
      throw new UnauthorizedException('Invalid role');
    }

    return true;
  }
}
