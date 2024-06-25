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
import { CreateChronoDto } from './dto/create-chrono.dto';
import { UpdateChronoDto } from './dto/update-chrono.dto';

@Controller({
  path: 'chronos',
  version: '1',
})
export class ChronosController {
  constructor(private readonly chronosService: ChronosService) {}

  @Post()
  create(@Body() createChronoDto: CreateChronoDto) {
    return this.chronosService.create(createChronoDto);
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
