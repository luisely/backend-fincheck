import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { ValidateCategoryOwnserShip } from './validate-category-owner.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepo: CategoriesRepository,
    private readonly validateCategory: ValidateCategoryOwnserShip,
  ) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepo.create({
      data: {
        ...createCategoryDto,
        userId,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(
    userId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.validateCategory.validate(userId, categoryId);

    return this.categoriesRepo.update({
      where: {
        id: categoryId,
      },
      data: { ...updateCategoryDto },
    });
  }

  async remove(userId: string, categoryId: string) {
    await this.validateCategory.validate(userId, categoryId);

    await this.categoriesRepo.delete({
      where: {
        id: categoryId,
      },
    });

    return null;
  }
}
