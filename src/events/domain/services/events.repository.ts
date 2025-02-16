import { EventAggregate } from '../entities/event-aggregate.entity';

export interface EventsRepository {
  findAll(): Promise<EventAggregate[]>;
  findOne(id: string): Promise<EventAggregate>;
  create(event: EventAggregate): Promise<void>;
  update(event: EventAggregate): Promise<void>;
  delete(id: string): Promise<void>;
}
