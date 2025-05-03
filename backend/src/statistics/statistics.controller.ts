import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../transactions/services/transactions.service'; // Import
import { StatisticsResponseDto } from '../shared/dtos/statistics-response.dto'; // Importa o DTO de resposta de estatísticas

@Controller('statistics') // Define o controller para o módulo statistics
@ApiTags('statistics')
export class StatisticsController {
  constructor(private readonly transactionsService: TransactionsService) {} // Injeta o serviço de transações

  @Get()
  @ApiOperation({
    summary: 'Retorna estatísticas das transações dos últimos 60 segundos',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
    type: StatisticsResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  getStatistics(): StatisticsResponseDto {
    return this.transactionsService.getStatistics();
  }
}
