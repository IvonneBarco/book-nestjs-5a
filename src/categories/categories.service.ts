import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.save(createCategoryDto);
      return {
        message: 'Categoría creada correctamente',
        data: category,
      };
    } catch {
      throw new BadRequestException('Error al crear la categoría');
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return {
      message: 'Categorías obtenidas correctamente',
      data: categories,
      count: categories.length,
    };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    return category;
  }

  async findById(id: number) {
    const data = await this.findOne(id);
    if (data === undefined) {
      // Código para simular un error de Categoría no encontrado
      throw new NotFoundException(`Categoría con ID ${id} no encontrado`);
    }
    return {
      message: 'Categoría encontrado',
      data,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      if (!category) {
        throw new BadRequestException('Categoría no encontrada');
      }

      const updatedCategory = this.categoryRepository.merge(category, updateCategoryDto);
      const savedCategory = await this.categoryRepository.save(updatedCategory);
      return {
        message: 'Categoría actualizada correctamente',
        data: savedCategory,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar la categoría');
    }
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException('Categoría no encontrada');
    }

    await this.categoryRepository.delete(id);
    return {
      message: 'Categoría eliminada correctamente',
    };
  }
}
