import { forwardRef, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { InMemoryTransactionRepository } from './repositories/in-memory-transaction.repository';
import { TransactionsService } from './services/transactions.service';
import { StatisticsModule } from '../statistics/statistics.module';
//import { ITransactionRepository } from './interfaces/transaction-repository.interface'; // Importe a interface

@Module({
  imports: [forwardRef(() => StatisticsModule)],
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
