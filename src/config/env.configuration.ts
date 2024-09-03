import { Logger } from '@nestjs/common';
import { plainToClass, Type } from 'class-transformer';
import {
  IsEnum,
  IsString,
  ValidateNested,
  validateSync,
} from 'class-validator';

export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  api: {
    port: parseInt(process.env.API_PORT, 10) || 3000,
    host: process.env.API_HOST,
    jwt: {
      secret: process.env.API_SECRET_API,
    },
  },
});

enum Environment {
  Local = 'local',
  Development = 'dev',
  Production = 'prod',
  Test = 'stg',
}

class JwtDTO {
  @IsString()
  secret: string;
}
class APIDTO {
  @IsString()
  port: string;

  @IsString()
  host: string;

  @ValidateNested({ each: true })
  @Type(() => JwtDTO)
  jwt: JwtDTO;
}
class EnvironmentVariables {
  @ValidateNested({ each: true })
  @Type(() => APIDTO)
  api: APIDTO;

  @IsEnum(Environment)
  NODE_ENV: Environment;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const [error] = errors;
    new Logger().error(JSON.stringify(error?.constraints));
    throw 'Variáveis definidas incorretas';
  }
  return validatedConfig;
};
