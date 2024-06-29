import { Module } from '@nestjs/common';
import { ChronosService } from './chronos.service';
import { ChronosController } from './chronos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChronoFolder, ChronoFolderSchema } from './entities/chrono.entity';
import { ChronoTree, ChronoTreeSchema } from './entities/chrono.tree.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChronoTree.name, schema: ChronoTreeSchema },
      { name: ChronoFolder.name, schema: ChronoFolderSchema },
    ]),
  ],
  controllers: [ChronosController],
  providers: [ChronosService],
})
export class ChronosModule {}
