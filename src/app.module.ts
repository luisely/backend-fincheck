import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    BankAccountsModule,
    CategoriesModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ], //services
})
export class AppModule {}
