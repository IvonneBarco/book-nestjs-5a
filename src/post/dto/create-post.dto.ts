import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  converImage: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
