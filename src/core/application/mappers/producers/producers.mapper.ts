import { Produtores } from '@prisma/client';
import { ProducersCreateDTO } from '../../dto/producers/producers.create.dto';

export function mapToPrisma(
  data: ProducersCreateDTO,
): Omit<Produtores, 'id' | 'createdAt' | 'updatedAt' | 'FazendaCulturas'> {
  return {
    cpfCnpj: data?.cpfCnpj,
    nome: data?.nome,
    nomeFazenda: data?.nomeFazenda,
    cidade: data?.cidade,
    estado: data?.estado,
    areaTotalHectares: data?.areaTotalHectares,
    areaAgricultavelHectares: data?.areaAgricultavelHectares,
    areaVegetacaoHectares: data?.areaVegetacaoHectares,
  };
}
