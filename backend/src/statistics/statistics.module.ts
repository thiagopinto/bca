import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TransactionsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
