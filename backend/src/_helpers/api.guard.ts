import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const key = req.headers['api-key'];

      if (key !== process.env.API_KEY) {
        throw new ForbiddenException('Wrong API key');
      }

      return true;
    } catch (e) {
      throw new ForbiddenException('Wrong API key');
    }
  }
}
