import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CountFazendasEstadoResponseDTO } from './count-fazendas-estado-response.dto';

export class CountFazendasCulturaResponseDTO extends OmitType(
  CountFazendasEstadoResponseDTO,
  ['estado'],
) {
  @ApiProperty({
    required: true,
    description: 'Nome da cultura',
  })
  nome: string;
}
