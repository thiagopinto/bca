import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Post()
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiBody({
    type: CreateTransactionDto,
    description: 'Objeto JSON contendo o valor da transação e o timestamp',
    examples: {
      'Exemplo de Requisição': {
        value: {
          amount: 123.45,
          timestamp: '2024-02-20T12:34:56.789Z',
        } as CreateTransactionDto,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Transação aceita e registrada' })
  @ApiResponse({
    status: 422,
    description: 'Transação rejeitada por violar alguma regra',
  })
  @ApiResponse({ status: 400, description: 'JSON malformado' })
  @HttpCode(HttpStatus.CREATED) // Define explicitamente o código de status 201
  createTransaction(@Body() transactionDto: CreateTransactionDto): void {
    try {
      this.transactionsService.createTransaction(transactionDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST); // Captura erros de validação (e outros)
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Apaga todas as transações' })
  @ApiResponse({
    status: 200,
    description: 'Todas as transações apagadas com sucesso',
  })
  @HttpCode(HttpStatus.OK)
  deleteAllTransactions(): void {
    this.transactionsService.deleteAllTransactions();
  }
}
