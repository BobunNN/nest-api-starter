import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPassword } from './entities/user-password.entity';
import { randomInt } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPassword)
    private userPasswordRepository: Repository<UserPassword>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async createWithPassword(createUserDto: CreateUserDto, hashedPassword: string): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    await this.userPasswordRepository.save({ userId: user.id, hashedPassword });
    return user;
  }

  async adminCreate(dto: CreateUserDto): Promise<{ user: User; password: string }> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+-={}[]|:;\'",.<>?/`~'; // Exclude ^
    const length = 16;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(randomInt(0,
        chars.length));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.createWithPassword(dto, hashedPassword);
    return { user, password };
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByQuery({ offset, limit, ...where }: QueryUserDto): Promise<User[]> {
    return this.userRepository.find({ where, skip: offset, take: limit });
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await this.userRepository.update({ id: id }, updateUserDto);
    if (res.affected === 0) {
      return null;
    }
    return this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
