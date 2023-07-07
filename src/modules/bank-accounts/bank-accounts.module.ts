import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountOwnserShip } from './validate-bank-account.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnserShip],
  exports: [ValidateBankAccountOwnserShip],
})
export class BankAccountsModule {}
