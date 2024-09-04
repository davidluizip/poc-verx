import { Prisma } from '@prisma/client';
import { ProducersCreateDTO } from '../../dto/producers/producers.create.dto';

export function mapToPrisma(
  data: ProducersCreateDTO,
): Prisma.ProdutoresCreateInput {
  return {
    cpfCnpj: data?.cpfCnpj,
    nome: data?.nome,
    nomeFazenda: data?.nomeFazenda,
    cidade: data?.cidade,
    estado: data?.estado,
    areaTotalHectares: data?.areaTotalHectares,
    areaAgricultavelHectares: data?.areaAgricultavelHectares,
    areaVegetacaoHectares: data?.areaVegetacaoHectares,
    FazendaCulturas: {
      create: {
        culturaId: data?.culturaId,
      },
    },
  };
}
