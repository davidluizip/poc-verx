import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export function removeMask(value: string): string {
  return value.replace(/\D/g, '');
}
export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const cleanedValue = removeMask(value);
          return cnpj.isValid(cleanedValue) || cpf.isValid(cleanedValue);
        },
        defaultMessage(args: ValidationArguments) {
          return 'CPF ou CNPJ inválido';
        },
      },
    });
  };
}
