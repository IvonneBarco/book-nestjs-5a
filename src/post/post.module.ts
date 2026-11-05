import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from '../categories/categories.controller';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostController, CategoriesController],
  providers: [PostService, CategoriesService],
})
export class PostModule {}
