import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [mongoConfig.KEY],
      useFactory: async (configService: ConfigType<typeof mongoConfig>) => ({
        dbName: configService.db,
        uri: configService.uri,
        auth: {
          username: configService.user,
          password: configService.password,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
