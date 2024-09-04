import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsValidArea(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidArea',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const dto = args.object as any;
          const areaTotal = dto.areaTotalHectares;
          const areaAgricultavel = dto.areaAgricultavelHectares;
          const areaVegetacao = dto.areaVegetacaoHectares;

          return areaAgricultavel + areaVegetacao <= areaTotal;
        },
        defaultMessage(args: ValidationArguments) {
          return 'A soma da área agricultável e da área de vegetação não pode ser maior que a área total.';
        },
      },
    });
  };
}
