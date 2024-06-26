import { Module } from '@nestjs/common';
import { ChronosModule } from './chronos/chronos.module';
import { DatabaseModule } from './databases/database.module';

@Module({
  imports: [DatabaseModule, ChronosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
