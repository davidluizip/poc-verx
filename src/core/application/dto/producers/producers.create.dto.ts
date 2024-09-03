import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class ProducersCreateDTO {
  @ApiProperty({
    required: true,
    example: '12345678900',
    description: 'CPF ou CNPJ do produtor',
  })
  @IsString()
  cpfCnpj: string;

  @ApiProperty({
    required: true,
    example: 'João da Silva',
    description: 'Nome do produtor',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    required: true,
    example: 'Fazenda do João',
    description: 'Nome da fazenda',
  })
  @IsString()
  nomeFazenda: string;

  @ApiProperty({
    required: true,
    example: 'Rua das Flores',
    description: 'Endereço da fazenda',
  })
  @IsString()
  cidade: string;

  @ApiProperty({
    required: true,
    example: 'SP',
    description: 'Estado da fazenda',
  })
  @IsString()
  estado: string;

  @ApiProperty({
    required: true,
    description: 'Área total',
  })
  @IsNumber({}, { message: 'Área total deve ser um número' })
  @Min(0, { message: 'Área total deve ser maior ou igual a 0' })
  areaTotalHectares: number;

  @ApiProperty({
    required: true,
    description: 'Área agricultável',
  })
  @IsNumber({}, { message: 'Área agricultável deve ser um número' })
  @Min(0, { message: 'Área agricultável deve ser maior ou igual a 0' })
  areaAgricultavelHectares: number;

  @ApiProperty({
    required: true,
    description: 'Área de vegetação',
  })
  @IsNumber({}, { message: 'Área de vegetação deve ser um número' })
  @Min(0, { message: 'Área de vegetação deve ser maior ou igual a 0' })
  areaVegetacaoHectares: number;
}
