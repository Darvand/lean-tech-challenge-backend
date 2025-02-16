import { Inject, Injectable } from '@nestjs/common';
import { EVENTS_PROVIDER } from '../events.provider';
import { EventsRepository } from '../domain/services/events.repository';
import { CreateEventDto } from '../presentation/dtos/create-event.dto';
import { EventMapper } from '../mappers/event.mapper';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_PROVIDER.EventRepository)
    private readonly eventsRepository: EventsRepository,
  ) {}

  findAll() {
    return this.eventsRepository.findAll();
  }

  create(createEventDto: CreateEventDto): Promise<void> {
    const event = EventMapper.toDomain({ ...createEventDto, status: 'draft' });
    return this.eventsRepository.create(event);
  }
}
