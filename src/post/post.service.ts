import { BadRequestException, Injectable } from '@nestjs/common';
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
    const posts = await this.postRepository.find();
    return {
      message: 'Posts obtenidos correctamente',
      data: posts,
      count: posts.length,
    };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
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
