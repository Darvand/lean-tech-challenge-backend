import { Module } from '@nestjs/common';
import { EventsController } from './presentation/event.controller';
import { EVENTS_PROVIDER } from './events.provider';
import { EventsMongoRepository } from './infraestructure/repositories/events-mongo.repository';
import { EventsService } from './application/events.service';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './infraestructure/schemas/event.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EventsController],
  providers: [
    {
      provide: EVENTS_PROVIDER.EventRepository,
      useClass: EventsMongoRepository,
    },
    EventsService,
  ],
  imports: [
    DatabaseModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
})
export class EventsModule {}
