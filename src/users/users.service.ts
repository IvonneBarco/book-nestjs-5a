import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<IUser>) {}

  async findAll() {
    const users = await this.userRepository.find();
    return {
      message: 'Usuarios encontrados',
      data: users,
    };
  }

  async findById(id: number) {
    const data = await this.findOne(id);
    if (data === undefined) {
      // Código para simular un error de usuario no encontrado
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Código para simular un error de permisos
    if (data.id === 1) {
      throw new ForbiddenException(`Usuario con ID ${id} no tiene permisos para acceder a este recurso`);
    }

    return {
      message: 'Usuario encontrado',
      data,
    };
  }

  async create(userPayload: CreateUserDto) {
    try {
      const newUser = await this.userRepository.save(userPayload);
      return {
        message: 'Usuario creado con éxito',
        data: newUser,
      };
    } catch (error: any) {
      throw new ForbiddenException(`Error al crear el usuario: ${error.message}`);
    }
  }

  async update(id: number, userChanges: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const updatedUser = this.userRepository.merge(user, userChanges);
    await this.userRepository.save(updatedUser);
    return {
      message: 'Usuario actualizado con éxito',
      data: updatedUser,
    };
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    await this.userRepository.delete(id);
    return {
      message: 'Usuario eliminado con éxito',
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}
