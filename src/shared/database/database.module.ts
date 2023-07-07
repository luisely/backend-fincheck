import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { TransactionsRepository } from './repositories/transactions.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    BankAccountsRepository,
    CategoriesRepository,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    BankAccountsRepository,
    CategoriesRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
