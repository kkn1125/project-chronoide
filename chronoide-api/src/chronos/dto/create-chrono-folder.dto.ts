import { ChronoFolder, ChronoTask } from '../entities/chrono.entity';

export class CreateChronoFolderDto {
  parent?: number | string;
  root?: ChronoFolder | ChronoTask;
}
