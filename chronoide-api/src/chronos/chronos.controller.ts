import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChronosService } from './chronos.service';
import { CreateChronoTaskDto } from './dto/create-chrono-task.entity';
import { UpdateChronoDto } from './dto/update-chrono.dto';

@Controller({
  path: 'chronos',
  version: '1',
})
export class ChronosController {
  constructor(private readonly chronosService: ChronosService) {}

  @Post()
  createRootFolder() {
    return this.chronosService.create();
  }

  @Post('/folder/:folder_id')
  createFolderIn(@Param('folder_id') folder_id: string) {
    console.log(folder_id);
    return this.chronosService.createFolderIn(folder_id);
  }

  @Post('/task/:folder_id')
  createTaskIn(
    @Param('folder_id') folder_id: string,
    @Body() createChronoTaskDto: CreateChronoTaskDto,
  ) {
    console.log(folder_id);
    return this.chronosService.createTaskIn(folder_id, createChronoTaskDto);
  }

  @Get()
  findAll() {
    return this.chronosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chronosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChronoDto: UpdateChronoDto) {
    return this.chronosService.update(+id, updateChronoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chronosService.remove(+id);
  }
}
