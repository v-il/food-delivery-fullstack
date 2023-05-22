import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Token } from './tokens.model';
import { User } from './users.model';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.cookies['authToken'];
      const tokenFromDb = await Token.findOne({ where: { token: token } });
      if (tokenFromDb) {
        const user = await User.findOne({
          where: { tg_id: tokenFromDb.dataValues.tg_id },
        });
        return true;
      }
    } catch {
        throw new UnauthorizedException();
    }
  }
}
