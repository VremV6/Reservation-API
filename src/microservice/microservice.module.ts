import { Module } from '@nestjs/common';
import { MicroserviceClient } from './microserviceClient.service';

@Module({
  providers: [MicroserviceClient],
  exports: [MicroserviceClient],
})
export class MicroserviceModule {}
