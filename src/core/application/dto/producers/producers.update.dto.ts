import { PartialType } from '@nestjs/swagger';
import { ProducersCreateDTO } from './producers.create.dto';

export class ProducersUpdateDTO extends PartialType(ProducersCreateDTO) {}
