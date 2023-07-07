import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(userId, createCategoryDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put(':categoryId')
  update(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(userId, categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoriesService.remove(userId, categoryId);
  }
}
