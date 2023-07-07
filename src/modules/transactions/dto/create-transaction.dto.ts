import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransactionType } from 'src/transaction-type.enum';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
