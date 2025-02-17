import { Inject, Injectable } from '@nestjs/common';
import { EVENTS_PROVIDER } from '../events.provider';
import { EventsRepository } from '../domain/services/events.repository';
import { CreateEventDto } from '../presentation/dtos/create-event.dto';
import { EventMapper } from '../mappers/event.mapper';
import { EventDto } from '../presentation/dtos/event.dto';
import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';
import { EventStatus } from '../domain/value-objects/event-status.value-object';
import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_PROVIDER.EventRepository)
    private readonly eventsRepository: EventsRepository,
  ) {}

  async findWithPagination(
    paginationParamsDto: PaginationParamsDto,
  ): Promise<ListPaginationDto<EventDto>> {
    const eventsPagination =
      await this.eventsRepository.findWithPagination(paginationParamsDto);
    return {
      items: eventsPagination.items.map(EventMapper.toDto),
      total: eventsPagination.total,
      limit: eventsPagination.limit,
      page: eventsPagination.page,
    };
  }

  create(createEventDto: CreateEventDto): Promise<void> {
    const event = EventMapper.toDomain({ ...createEventDto, status: 'draft' });
    return this.eventsRepository.create(event);
  }

  async updateStatus(id: UUID, nextStatus: EventStatus): Promise<EventDto> {
    const event = await this.eventsRepository.findOne(id);
    event.updateStatus(nextStatus);
    const eventUpdated = await this.eventsRepository.update(event);
    return EventMapper.toDto(eventUpdated);
  }
}
