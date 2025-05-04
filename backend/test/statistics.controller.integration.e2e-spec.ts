import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('POST /transactions', () => {
    it('create a transaction', async () => {
      const transactionDto = {
        amount: 123.45,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      return await request(app.getHttpServer())
        .post('/transactions')
        .send(transactionDto)
        .expect(201);

      //Acho que deveria ter um retorno, mas não tem nos requisitos 🙈

      //expect(response.body).toHaveProperty('id'); // Supondo que o retorno tenha um ID
      //expect(response.body.amount).toBe(transactionDto.amount);
    });
  });

  describe('DELETE /transactions', () => {
    it('delete all transactions', async () => {
      return await request(app.getHttpServer())
        .delete('/transactions')
        .expect(200);
    });
  });
});
