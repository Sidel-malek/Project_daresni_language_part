import { Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';

@Module({
  providers: [ProducerService],
  exports:[ProducerService]
})
export class KafkaModule {}
