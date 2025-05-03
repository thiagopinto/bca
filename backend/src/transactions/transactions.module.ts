import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { InMemoryTransactionRepository } from './repositories/in-memory-transaction.repository';
import { TransactionsService } from './services/transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, InMemoryTransactionRepository],
})
export class TransactionsModule {}
