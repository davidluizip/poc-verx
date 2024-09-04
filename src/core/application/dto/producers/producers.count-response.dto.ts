import { ApiProperty } from '@nestjs/swagger';

export class ProducersCountResponseDTO {
  @ApiProperty({
    required: true,
    description: 'Quantidade de produtores',
  })
  count: number;
}
