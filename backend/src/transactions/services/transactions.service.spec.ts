import { TransactionsService } from './transactions.service';
import { StatisticsGateway } from '../../statistics/statistics.gateway';
import { InMemoryTransactionRepository } from '../repositories/in-memory-transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionRepository: InMemoryTransactionRepository;
  let statisticsGateway: StatisticsGateway;

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    statisticsGateway = {
      broadcastStatistics: jest.fn(),
    } as unknown as StatisticsGateway;

    transactionsService = new TransactionsService(
      transactionRepository,
      statisticsGateway,
    );
  });

  describe('createTransaction', () => {
    it('should create a transaction', () => {
      const transactionDto: CreateTransactionDto = {
        amount: 100,
        timestamp: new Date().toISOString(),
      };

      transactionsService.createTransaction(transactionDto);

      // Como InMemoryTransactionRepository armazena as transações em memória,
      // podemos acessar diretamente a propriedade 'transactions' para verificar
      // se a transação foi salva corretamente.
      const transactions = transactionRepository['transactions'];
      expect(transactions).toHaveLength(1);
      expect(transactions[0].amount).toBe(transactionDto.amount);
      expect(transactions[0].timestamp.toISOString()).toBe(
        transactionDto.timestamp,
      );
    });

    it('should throw an error if the timestamp is in the future', () => {
      const futureTimestamp = new Date(Date.now() + 60000).toISOString(); // 60 segundos no futuro
      const transactionDto: CreateTransactionDto = {
        amount: 100,
        timestamp: futureTimestamp,
      };

      expect(() =>
        transactionsService.createTransaction(transactionDto),
      ).toThrowError(
        new HttpException(
          'Transaction timestamp cannot be in the future',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    });
  });
});
