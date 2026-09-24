import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // @Get('search/:name')
  // getUserByName(@Param('name') name: string) {
  //   const data = this.users.find((user) => user.name === name);
  //   if (!data) {
  //     throw new NotFoundException(`Usuario con nombre ${name} no encontrado`);
  //   }
  //   return {
  //     data: data?.email,
  //   };
  // }

  @Post()
  createUser(@Body() userPayload: CreateUserDto) {
    return this.usersService.create(userPayload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userChanges: UpdateUserDto) {
    return this.usersService.update(id, userChanges);
  }
}
