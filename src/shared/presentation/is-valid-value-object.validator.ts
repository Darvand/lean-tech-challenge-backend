import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
export class ValidateValueObject implements ValidatorConstraintInterface {
  private errorMessage: string;

  validate(value: any, args: ValidationArguments) {
    try {
      args.constraints[0](value);
      return true;
    } catch (error) {
      this.errorMessage = error.message;
      return false;
    }
  }

  defaultMessage() {
    return `Invalid value: ${this.errorMessage}`;
  }
}

export function IsValidValueObject(
  createValueObject: (value: any) => any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [createValueObject],
      validator: ValidateValueObject,
    });
  };
}
