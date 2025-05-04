import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  @ApiOperation({ summary: 'Verifica se a API está online' })
  @ApiResponse({ status: 200, description: 'API está online' })
  @HttpCode(HttpStatus.OK)
  check(): { status: string } {
    return { status: 'ok' };
  }
}
