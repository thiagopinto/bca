import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface'; // Importe a interface
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: ITransactionRepository) {} // Use a interface

  createTransaction(transactionDto: CreateTransactionDto): void {
    const now = new Date();
    const transactionTimestamp = new Date(transactionDto.timestamp);

    if (transactionTimestamp > now) {
      throw new HttpException(
        'Transaction timestamp cannot be in the future',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const transaction = new Transaction(
      transactionDto.amount,
      transactionTimestamp,
    );
    this.transactionRepository.save(transaction);
  }
}
