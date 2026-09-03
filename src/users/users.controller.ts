import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {

  private users: User[] = [
    {
      "id": "1",
      "name": "Maria",
      "email": "maria@correo.com"
    },
    {
      "id": "2",
      "name": "Carlos",
      "email": "carlos@correo.com"
    },
    {
      "id": "3",
      "name": "Ana",
      "email": "ana@correo.com"
    },
    {
      "id": "4",
      "name": "Luis",
      "email": "luis@correo.com"
    },
    {
      "id": "5",
      "name": "Sofia",
      "email": "sofia@correo.com"
    },
    {
      "id": "6",
      "name": "Mateo",
      "email": "mateo@correo.com"
    },
    {
      "id": "7",
      "name": "Lucia",
      "email": "lucia@correo.com"
    },
    {
      "id": "8",
      "name": "Diego",
      "email": "diego@correo.com"
    },
    {
      "id": "9",
      "name": "Elena",
      "email": "elena@correo.com"
    },
    {
      "id": "10",
      "name": "Javier",
      "email": "javier@correo.com"
    }
  ]

  @Get('')
  getUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('.:: UserID:', id);
    const data = this.users.find((user) => user.id === id);
    console.log('.:: data: ', data);
    if(data === undefined) {
      return {
        msg: 'No existe el ID',
        data
      }
    }
    return {
      msg: 'Usuario encontrado',
      data
    };
  }

  @Get('search/:name')
  getUserByName(@Param('name') name: string) {
    const data = this.users.find((user) => user.name === name);
    if(!data) {
      return {
        msg: 'Nombre no encontrado'
      }
    }
    return {
      data: data?.email
    };
  }

}
