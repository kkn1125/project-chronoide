import { Module } from '@nestjs/common';
import { ChronosService } from './chronos.service';
import { ChronosController } from './chronos.controller';

@Module({
  controllers: [ChronosController],
  providers: [ChronosService],
})
export class ChronosModule {}
