import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

 async login(user: any, response: Response) {
  const payload = { 
    email: user.email, 
    sub: user.id, 
    username: user.username 
  };
    const access_token = this.jwtService.sign(payload);

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    return { message: 'Login bem-sucedido' };
  }
   async logout(response: Response) {
    // Usa o método clearCookie do objeto de resposta para remover o cookie do navegador
    response.clearCookie('access_token');
    return { message: 'Logout bem-sucedido' };
  }
}