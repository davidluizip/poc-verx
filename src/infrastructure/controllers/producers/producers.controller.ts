import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountFazendasCulturaResponseDTO } from 'src/core/application/dto/producers/count-fazendas-cultura-response.dto';
import { CountFazendasEstadoResponseDTO } from 'src/core/application/dto/producers/count-fazendas-estado-response.dto';
import { ProducersCountResponseDTO } from 'src/core/application/dto/producers/producers.count-response.dto';
import { ProducersCreateDTO } from 'src/core/application/dto/producers/producers.create.dto';
import { ProducersUpdateDTO } from 'src/core/application/dto/producers/producers.update.dto';
import { SumAreasResponseDTO } from 'src/core/application/dto/producers/sum-areas-response.dto';
import {
  SwaggerErrorResponse,
  WithBasePostPutResponse,
} from 'src/core/application/dto/swagger/swagger.dto';
import { ProducersService } from 'src/core/domain/services/producers/producers.service';

@ApiTags('producers')
@Controller()
export class ProducersController {
  constructor(private readonly producers: ProducersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(ProducersCountResponseDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  count() {
    return this.producers.count();
  }

  @Get('total-hectares')
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(ProducersCountResponseDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  sumTotalHectares() {
    return this.producers.sumTotalHectares();
  }

  @Get('count-fazendas-Estado')
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(CountFazendasEstadoResponseDTO, null, true),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  countFazendasByEstado() {
    return this.producers.countFazendasByEstado();
  }

  @Get('count-fazendas-cultura')
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(CountFazendasCulturaResponseDTO, null, true),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  countFazendasCultura() {
    return this.producers.countFazendasCultura();
  }

  @Get('total-areas')
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(SumAreasResponseDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  sumAreas() {
    return this.producers.sumAreas();
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(ProducersCreateDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  create(@Body() data: ProducersCreateDTO) {
    return this.producers.create({ producers: data });
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(ProducersUpdateDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ProducersUpdateDTO,
  ) {
    return this.producers.update({ id, data });
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.producers.delete({ id });
  }
}
