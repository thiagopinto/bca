import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { plainToClass } from 'class-transformer';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Post()
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ status: 201, description: 'Transação aceita e registrada' })
  @ApiResponse({
    status: 422,
    description: 'Transação rejeitada por violar alguma regra',
  })
  @ApiResponse({ status: 400, description: 'JSON malformado' })
  @HttpCode(HttpStatus.CREATED) // Define explicitamente o código de status 201
  createTransaction(@Body() body: CreateTransactionDto): void {
    try {
      const transactionDto = plainToClass(CreateTransactionDto, body);
      this.transactionsService.createTransaction(transactionDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST); // Captura erros de validação (e outros)
    }
  }
}
