import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findAll() {
    return await this.usersRepo.findAll();
  }

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (updateUserDto.password) {
      if (!updateUserDto.oldPassword) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      const checkPassword = await compare(
        updateUserDto.oldPassword,
        user.password,
      );

      if (!checkPassword) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      updateUserDto.password = await hash(updateUserDto.password, 12);

      delete updateUserDto.oldPassword;
    }

    return this.usersRepo.update({
      where: {
        id: userId,
      },
      select: { name: true, avatarUrl: true, email: true },
      data: { ...updateUserDto },
    });
  }
}
