import { Transaction } from '../entities/transaction.entity'; // Importe a interface e a entidade
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  save(transaction: Transaction): void {
    this.transactions.push(transaction);
  }
  // O método findAll retorna todas as transações armazenadas no repositório de brinde
  findAll(): Transaction[] {
    return this.transactions;
  }

  deleteAll(): void {
    this.transactions = [];
  }

  getTransactionsInLast60Seconds(): Transaction[] {
    const now = new Date();
    const timeLimit = new Date(now.getTime() - 60000);
    return this.transactions.filter(
      (transaction) => transaction.timestamp >= timeLimit,
    );
  }
}
