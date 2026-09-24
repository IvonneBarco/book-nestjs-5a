import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Maria',
      email: 'maria@correo.com',
    },
    {
      id: '2',
      name: 'Carlos',
      email: 'carlos@correo.com',
    },
    {
      id: '3',
      name: 'Ana',
      email: 'ana@correo.com',
    },
    {
      id: '4',
      name: 'Luis',
      email: 'luis@correo.com',
    },
    {
      id: '5',
      name: 'Sofia',
      email: 'sofia@correo.com',
    },
    {
      id: '6',
      name: 'Mateo',
      email: 'mateo@correo.com',
    },
    {
      id: '7',
      name: 'Lucia',
      email: 'lucia@correo.com',
    },
    {
      id: '8',
      name: 'Diego',
      email: 'diego@correo.com',
    },
    {
      id: '9',
      name: 'Elena',
      email: 'elena@correo.com',
    },
    {
      id: '10',
      name: 'Javier',
      email: 'javier@correo.com',
    },
  ];

  @Get('')
  getUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('.:: UserID:', id);
    const data = this.users.find((user) => user.id === id);
    console.log('.:: data: ', data);
    if (data === undefined) {
      // Código para simular un error de usuario no encontrado
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Código para simular un error de permisos
    if (data.id === '1') {
      throw new ForbiddenException(`Usuario con ID ${id} no tiene permisos para acceder a este recurso`);
    }

    return {
      msg: 'Usuario encontrado',
      data,
    };
  }

  @Get('search/:name')
  getUserByName(@Param('name') name: string) {
    const data = this.users.find((user) => user.name === name);
    if (!data) {
      throw new NotFoundException(`Usuario con nombre ${name} no encontrado`);
    }
    return {
      data: data?.email,
    };
  }

  @Post()
  createUser(@Body() userPayload: CreateUserDto) {
    const newUser = {
      ...userPayload,
      id: `${new Date().getTime()}`,
      nickname: userPayload.name.substring(0, 3) + Math.floor(Math.random() * 1000)
    };
    this.users.push(newUser);

    return {
      data: newUser,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log('.:: UserID:', id);
    const position = this.users.findIndex((user) => user.id === id);
    console.log('.:: position: ', position);
    if (position === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    this.users.splice(position, 1);

    return {
      msg: 'Usuario eliminado con éxito',
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userChanges: UpdateUserDto) {
    console.log('.:: UserID Update:', id);
    console.log('.:: userChanges: ', userChanges);

    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const existingUser = this.users[position];
    const updatedUser = { ...existingUser, ...userChanges };
    this.users[position] = updatedUser;

    return {
      msg: 'Usuario actualizado con éxito',
      data: updatedUser,
    };
  }
}
