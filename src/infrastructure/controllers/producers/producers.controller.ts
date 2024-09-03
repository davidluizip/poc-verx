import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProducersCreateDTO } from 'src/core/application/dto/producers/producers.create.dto';
import {
  SwaggerErrorResponse,
  WithBasePostPutResponse,
} from 'src/core/application/dto/swagger/swagger.dto';
import { ProducersService } from 'src/core/domain/services/producers/producers.service';

@ApiTags('producers')
@Controller()
export class ProducersController {
  constructor(private readonly producers: ProducersService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(ProducersCreateDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  @ApiResponse({ status: 404, description: 'Produtos não encontrado.' })
  create(@Body() data: ProducersCreateDTO) {
    return this.producers.create({ producers: data });
  }
}
