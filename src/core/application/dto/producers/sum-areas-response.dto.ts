import { ApiProperty } from '@nestjs/swagger';

export class SumAreasResponseDTO {
  @ApiProperty({
    required: true,
    description: 'Área total',
  })
  areaAgricultavel: number;

  @ApiProperty({
    required: true,
    description: 'Área total',
  })
  areaVegetacao: number;
}
