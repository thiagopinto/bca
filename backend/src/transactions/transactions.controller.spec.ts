/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const transactionsServiceMock = {
      createTransaction: jest.fn(() => {}), // Mock da função createTransaction
      deleteAllTransactions: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        // Fornece o mock para o TransactionsService.  O NestJS
        // usará este mock em vez da implementação real.
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock,
        },
      ],
    }).compile();

    // Obtém instâncias do controller e do serviço mockado.
    transactionsController = module.get<TransactionsController>(
      TransactionsController,
    );
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  describe('createTransaction', () => {
    it('should call transactionsService.createTransaction with the provided dto', () => {
      // Define um DTO de exemplo para usar no teste.
      const transactionDto: CreateTransactionDto = {
        amount: 123.45,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      // Chama o método do controller que estamos testando.
      transactionsController.createTransaction(transactionDto);

      // Verifica se o método createTransaction do serviço foi chamado
      // com o DTO correto.
      expect(transactionsService.createTransaction).toHaveBeenCalledWith(
        transactionDto,
      );
    });

    it('should return 201 Created on successful transaction creation', () => {
      const transactionDto: CreateTransactionDto = {
        amount: 123.45,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      // Simula o serviço retornando void (sucesso).
      (transactionsService.createTransaction as jest.Mock).mockReturnValue(
        undefined,
      );

      // Como o método createTransaction do controller não retorna nada,
      // não precisamos verificar o valor de retorno.  Em vez disso,
      // verificamos se o código de status HTTP foi definido corretamente.
      expect(() =>
        transactionsController.createTransaction(transactionDto),
      ).not.toThrow();
    });

    it('should handle HttpException from transactionsService', () => {
      const transactionDto: CreateTransactionDto = {
        amount: 123.45,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      // Simula o serviço lançando uma HttpException.
      (transactionsService.createTransaction as jest.Mock).mockImplementation(
        () => {
          throw new HttpException(
            'Transaction failed',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        },
      );

      // Verifica se o controller lança a mesma exceção.
      expect(() =>
        transactionsController.createTransaction(transactionDto),
      ).toThrowError(
        new HttpException(
          'Transaction failed',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    });

    it('should handle generic errors from transactionsService', () => {
      const transactionDto: CreateTransactionDto = {
        amount: 123.45,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      // Simula o serviço lançando um erro genérico.
      (transactionsService.createTransaction as jest.Mock).mockImplementation(
        () => {
          throw new Error('Some unexpected error');
        },
      );

      expect(() =>
        transactionsController.createTransaction(transactionDto),
      ).toThrowError(
        new HttpException('Invalid input', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('deleteAllTransactions', () => {
    it('should call transactionsService.deleteAllTransactions', () => {
      transactionsController.deleteAllTransactions();
      expect(transactionsService.deleteAllTransactions).toHaveBeenCalled();
    });
  });
});
