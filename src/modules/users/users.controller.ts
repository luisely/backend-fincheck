import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Role } from 'src/role.enum';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch()
  update(@ActiveUserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }
}
