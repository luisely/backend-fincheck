import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountsRepository } from '../../shared/database/repositories/bank-accounts.repositories';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ValidateBankAccountOwnserShip } from './validate-bank-account.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnserShip: ValidateBankAccountOwnserShip,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountsRepo.create({
      data: {
        ...createBankAccountDto,
        userId,
        // posso usar spread com segurança pois está ativo Whitelist no Main.ts
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            name: true,
            value: true,
            type: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        currentBalance,
        ...bankAccount,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBanckAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnserShip.validate(userId, bankAccountId);

    return this.bankAccountsRepo.update({
      where: {
        id: bankAccountId,
      },
      data: { ...updateBanckAccountDto },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnserShip.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId,
      },
    });

    return null;
  }
}
