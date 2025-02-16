import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors.flatMap((error) => {
          console.log('errors', error);
          if (error.children?.length > 0) {
            return error.children.map((childError) => ({
              ...childError,
              property: `${error.property}.${childError.property}`,
            }));
          }
          return error;
        });
        return new UnprocessableEntityException(
          errors.map((error) => {
            return {
              field: error.property,
              error: Object.values(error.constraints).join(', '),
            };
          }),
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
