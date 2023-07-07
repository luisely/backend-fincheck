import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @ValidateIf((o) => o.password !== undefined)
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  oldPassword: string;
}
