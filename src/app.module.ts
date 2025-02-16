import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongoConfig } from './database/database.config';
import { EventsModule } from './events/event.module';

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
