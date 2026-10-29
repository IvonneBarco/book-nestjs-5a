import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength, Validate, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './profile.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 8)
  nickname?: string;
}
