import { Inject, Injectable } from '@nestjs/common';
import { EVENTS_PROVIDER } from '../events.provider';
import { EventsRepository } from '../domain/services/events.repository';
import { CreateEventDto } from '../presentation/dtos/create-event.dto';
import { EventMapper } from '../mappers/event.mapper';
import { ListEventsDto } from '../presentation/dtos/list-events.dto';
import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_PROVIDER.EventRepository)
    private readonly eventsRepository: EventsRepository,
  ) {}

  async findWithPagination(
    paginationParamsDto: PaginationParamsDto,
  ): Promise<ListPaginationDto<ListEventsDto>> {
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
}
