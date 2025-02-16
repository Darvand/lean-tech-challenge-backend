import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../../domain/services/events.repository';
import { EventAggregate } from '../../domain/entities/event-aggregate.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schemas/event.schema';
import { Model } from 'mongoose';
import { EventMapper } from 'src/events/mappers/event.mapper';

@Injectable()
export class EventsMongoRepository implements EventsRepository {
  constructor(@InjectModel(Event.name) private readonly model: Model<Event>) {}

  async findAll(): Promise<EventAggregate[]> {
    const eventModel = await this.model.find().exec();
    return eventModel.map(EventMapper.toDomain);
  }

  async findOne(id: string): Promise<EventAggregate> {
    return null;
  }

  async create(event: EventAggregate): Promise<void> {
    const eventModel = EventMapper.toPersistance(event);
    await this.model.create(eventModel);
  }

  async update(event: EventAggregate): Promise<void> {
    return null;
  }

  async delete(id: string): Promise<void> {
    return null;
  }
}
