import { ApiProperty } from '@nestjs/swagger';

export class PaginationRequestDTO {
  @ApiProperty({
    required: false,
    description: 'Page number',
  })
  page: number;

  @ApiProperty({
    required: false,
    description: 'Limit of items per page',
  })
  limit: number;
}
