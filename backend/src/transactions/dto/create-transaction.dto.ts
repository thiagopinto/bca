import { IsISO8601, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsISO8601()
  timestamp: string;
}
