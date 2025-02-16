import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface MongoConfig {
  db: string;
  user: string;
  password: string;
  uri: string;
}

export const mongoConfig = registerAs('database', (): MongoConfig => {
  const values: MongoConfig = {
    db: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    uri: process.env.DATABASE_URI,
  };

  const schema = Joi.object<MongoConfig, true>({
    db: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    uri: Joi.string().required(),
  });

  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    const messageError = `Validation failed - Is there a Mongo environment variable missing?
      ${error.message}`;

    throw new Error(messageError);
  }

  return values;
});
