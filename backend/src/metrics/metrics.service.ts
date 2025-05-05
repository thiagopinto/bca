import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: Registry;

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });
  }

  async getMetrics(): Promise<string> {
    return await this.registry.metrics();
  }

  getRegistry(): Registry {
    return this.registry;
  }
}
