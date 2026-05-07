import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signUp(dto: SignUpDto): Promise<void> {

  }

  async signInPwd(email: string, pass: string): Promise<{ access_token: string }> {
    const [user] = await this.usersService.findByQuery({ email });
    if (!user) throw new UnauthorizedException();

    const userPassword = await this.usersService.findPasswordByUserId(user.id);
    if (!userPassword || !(await bcrypt.compare(pass, userPassword.hashedPassword))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

}
