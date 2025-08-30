import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

const cookieOptions = {
  httpOnly: true,
  secure: true, 
  sameSite: 'none' as const, 
  path: '/', 
};


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
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24, 
    });

    return { message: 'Login bem-sucedido' };
  }
   async logout(response: Response) {
    // método clearCookie
    response.clearCookie('access_token', cookieOptions);
    return { message: 'Logout bem-sucedido' };
  }
}