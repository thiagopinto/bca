import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TransactionsService } from '../src/transactions/services/transactions.service';
import { App } from 'supertest/types';

describe('StatisticsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TransactionsService) // aqui fazemos o mock
      .useValue({
        getStatistics: jest.fn().mockResolvedValue({
          count: 0,
          sum: 0,
          avg: 0,
          min: 0,
          max: 0,
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /statistics should return mock data', async () => {
    const response = await request(app.getHttpServer())
      .get('/statistics')
      .expect(200);

    expect(response.body).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
