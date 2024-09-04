import { ApiProperty } from '@nestjs/swagger';

export class CountFazendasEstadoResponseDTO {
  @ApiProperty({
    required: true,
    description: 'Estado',
  })
  estado: string;

  @ApiProperty({
    required: true,
    description: 'Total de fazendas',
  })
  totalFazendas: number;
}
