import { Injectable } from '@nestjs/common';
import { CreateChronoDto } from './dto/create-chrono.dto';
import { UpdateChronoDto } from './dto/update-chrono.dto';

@Injectable()
export class ChronosService {
  create(createChronoDto: CreateChronoDto) {
    return 'This action adds a new chrono';
  }

  findAll() {
    return `This action returns all chronos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chrono`;
  }

  update(id: number, updateChronoDto: UpdateChronoDto) {
    return `This action updates a #${id} chrono`;
  }

  remove(id: number) {
    return `This action removes a #${id} chrono`;
  }
}
