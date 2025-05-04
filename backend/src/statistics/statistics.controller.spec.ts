/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { TransactionsService } from '../transactions/services/transactions.service';
import { StatisticsResponseDto } from '../shared/dtos/statistics-response.dto';

describe('StatisticsController', () => {
  let statisticsController: StatisticsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    // Cria um mock para o TransactionsService.
    const transactionsServiceMock = {
      getStatistics: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock,
        },
      ],
    }).compile();

    statisticsController =
      module.get<StatisticsController>(StatisticsController);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  describe('getStatistics', () => {
    it('should call transactionsService.getStatistics', () => {
      statisticsController.getStatistics();
      expect(transactionsService.getStatistics).toHaveBeenCalled();
    });

    it('should return the statistics returned by the service', () => {
      const expectedStatistics: StatisticsResponseDto = {
        count: 10,
        sum: 1000,
        avg: 100,
        min: 10,
        max: 200,
      };
      (transactionsService.getStatistics as jest.Mock).mockReturnValue(
        expectedStatistics,
      );

      const result = statisticsController.getStatistics();
      expect(result).toEqual(expectedStatistics);
    });
  });
});
