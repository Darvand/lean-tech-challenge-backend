import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface AuthConfig {
  audience: string;
  issuer: string;
}

export const authConfig = registerAs('auth', (): AuthConfig => {
  const values: AuthConfig = {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER_URL,
  };

  const schema = Joi.object<AuthConfig, true>({
    audience: Joi.string().required(),
    issuer: Joi.string().required(),
  });

  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    const messageError = `Validation failed - Is there a Auth environment variable missing?
      ${error.message}`;

    throw new Error(messageError);
  }

  return values;
});
