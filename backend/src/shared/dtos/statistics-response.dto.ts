import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty({ description: 'Contagem de transações' })
  count: number;

  @ApiProperty({ description: 'Soma dos valores das transações' })
  sum: number;

  @ApiProperty({ description: 'Média dos valores das transações' })
  avg: number;

  @ApiProperty({ description: 'Menor valor de transação' })
  min: number;

  @ApiProperty({ description: 'Maior valor de transação' })
  max: number;
}
