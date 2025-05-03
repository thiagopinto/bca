import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface'; // Importe a interface
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { StatisticsResponseDto } from '../../shared/dtos/statistics-response.dto';
/*
 * O TransactionsService é responsável por gerenciar as transações financeiras.
 * Represento UseCase Clean Architecture 👀
 **/
@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  createTransaction(transactionDto: CreateTransactionDto): void {
    const now = new Date();
    const transactionTimestamp = new Date(transactionDto.timestamp);

    if (transactionDto.amount < 0) {
      throw new HttpException(
        'Amount cannot be negative',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

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

  deleteAllTransactions(): void {
    this.transactionRepository.deleteAll();
  }

  getStatistics(): StatisticsResponseDto {
    const transactions =
      this.transactionRepository.getTransactionsInLast60Seconds();

    if (transactions.length === 0) {
      return {
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      };
    }

    const sum = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const min = Math.min(...transactions.map((t) => t.amount));
    const max = Math.max(...transactions.map((t) => t.amount));
    const avg = sum / transactions.length;

    return {
      count: transactions.length,
      sum,
      avg,
      min,
      max,
    };
  }
}
