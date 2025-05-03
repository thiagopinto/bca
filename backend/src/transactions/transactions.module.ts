import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { InMemoryTransactionRepository } from './repositories/in-memory-transaction.repository';
import { TransactionsService } from './services/transactions.service';
//import { ITransactionRepository } from './interfaces/transaction-repository.interface'; // Importe a interface

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'TRANSACTION_REPOSITORY',
      useClass: InMemoryTransactionRepository,
    },
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
