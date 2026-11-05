import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}
  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postRepository.save({
        ...body,
        user: { id: body.userId },
        categories: body.categoryIds?.map((categoryId) => ({ id: categoryId })),
      });
      return {
        message: 'Post creado correctamente',
        data: newPost,
      };
    } catch {
      throw new BadRequestException('Error al crear el post');
    }
  }

  async findAll() {
    const posts = await this.postRepository.find({
      relations: {
        user: {
          profile: true,
        },
        categories: true,
      },
    });
    return {
      message: 'Posts obtenidos correctamente',
      data: posts,
      count: posts.length,
    };
  }

  async findById(id: number) {
    const data = await this.findOne(id);
    if (data === undefined) {
      // Código para simular un error de Post no encontrado
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }

    return {
      message: 'Post encontrado',
      data,
    };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: {
          profile: true,
        },
        categories: true,
      },
    });

    return post;
  }

  async update(id: number, changes: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      if (!post) {
        throw new BadRequestException('Post no encontrado');
      }
      const updatedPost = this.postRepository.merge(post, changes);
      const savedPost = this.postRepository.save(updatedPost);
      return {
        message: 'Post actualizado correctamente',
        data: updatedPost,
      };
    } catch (error) {
      throw new BadRequestException('Error al actualizar el post');
    }
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new BadRequestException('Post no encontrado');
    }
    this.postRepository.delete(id);
    return {
      message: 'Post eliminado correctamente',
    };
  }
}
