import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
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

  findAll() {
    return this.users;
  }

  findById(id: string) {
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
      message: 'Usuario encontrado',
      data,
    };
  }

  create(userPayload: CreateUserDto) {
    const newUser = {
      ...userPayload,
      id: `${new Date().getTime()}`,
      nickname: userPayload.name.substring(0, 3) + Math.floor(Math.random() * 1000),
    };
    this.users.push(newUser);

    return {
      data: newUser,
    };
  }

  update(id: string, userChanges: UpdateUserDto) {
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
      message: 'Usuario actualizado con éxito',
      data: updatedUser,
    };
  }

  delete(id: string) {
    console.log('.:: UserID:', id);
    const position = this.users.findIndex((user) => user.id === id);
    console.log('.:: position: ', position);
    if (position === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    this.users.splice(position, 1);

    return {
      message: 'Usuario eliminado con éxito',
    };
  }
}
