import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): void;
  findAll(): Transaction[];
  deleteAll(): void;
  getTransactionsInLast60Seconds(): Transaction[];
}
