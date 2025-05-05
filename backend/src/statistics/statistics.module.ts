import { forwardRef, Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { StatisticsService } from './statistics.service';
import { StatisticsGateway } from './statistics.gateway';

@Module({
  imports: [forwardRef(() => TransactionsModule)],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsGateway],
  exports: [StatisticsGateway],
})
export class StatisticsModule {}
