import { ApiProperty } from '@nestjs/swagger';
import { GetAllCulturesDTO } from './getall-order.dto';

export class FindAllCulturesQueryDTO extends GetAllCulturesDTO {
  @ApiProperty({
    description: 'Nome da cultura',
    required: false,
  })
  nome: string;

  constructor(obj: any) {
    super();
    this.nome = obj?.nome;
  }
}
