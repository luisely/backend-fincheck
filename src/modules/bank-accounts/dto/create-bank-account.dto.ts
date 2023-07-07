import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';
import { BankAccountType } from '../entities/type-account.enum';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsString()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
