import { PartialType } from '@nestjs/mapped-types';
import { CreateChronoDto } from './create-chrono.dto';

export class UpdateChronoDto extends PartialType(CreateChronoDto) {}
