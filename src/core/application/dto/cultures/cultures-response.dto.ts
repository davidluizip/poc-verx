import { ApiProperty } from '@nestjs/swagger';

export class CulturesResponseDTO {
  @ApiProperty({
    required: true,
    description: 'Identificador da cultura',
  })
  id: number;

  @ApiProperty({
    required: true,
    description: 'Nome da cultura',
  })
  nome: string;
}
