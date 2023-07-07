import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnserShip } from './validate-category-owner.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnserShip],
  exports: [ValidateCategoryOwnserShip],
})
export class CategoriesModule {}
