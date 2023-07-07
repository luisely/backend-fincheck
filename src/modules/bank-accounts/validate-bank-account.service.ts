import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from '../../shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnserShip {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Account not found');
    }
  }
}
