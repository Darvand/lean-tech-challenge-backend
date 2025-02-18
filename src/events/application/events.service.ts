import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { EVENTS_PROVIDER } from '../events.provider';
import { EventsRepository } from '../domain/services/events.repository';
import { CreateEventDto } from '../presentation/dtos/create-event.dto';
import { EventMapper } from '../mappers/event.mapper';
import { EventDto } from '../presentation/dtos/event.dto';
import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';
import { EventStatus } from '../domain/value-objects/event-status.value-object';
import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';
import { EventResponseDto } from '../presentation/dtos/event-response.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    @Inject(EVENTS_PROVIDER.EventRepository)
    private readonly eventsRepository: EventsRepository,
  ) {}

  async findWithPagination(
    paginationParamsDto: PaginationParamsDto,
    userId: string,
  ): Promise<ListPaginationDto<EventResponseDto>> {
    const eventsPagination = await this.eventsRepository.findWithPagination(
      paginationParamsDto,
      userId,
    );
    this.logger.log(`Found ${eventsPagination.items.length} events`);
    return {
      items: eventsPagination.items.map(EventMapper.toDtoResponse),
      total: eventsPagination.total,
      limit: eventsPagination.limit,
      page: eventsPagination.page,
    };
  }

  async create(
    createEventDto: CreateEventDto,
    userId: string,
  ): Promise<EventDto> {
    const event = EventMapper.toDomain({
      ...createEventDto,
      userId,
      status: 'draft',
    });
    const eventCreated = await this.eventsRepository.create(event);
    this.logger.log(`Event with id ${eventCreated.id.value} created`);
    return EventMapper.toDto(eventCreated);
  }

  async updateStatus(
    id: UUID,
    nextStatus: EventStatus,
    userId: string,
  ): Promise<EventDto> {
    const event = await this.eventsRepository.findOne(id);
    if (!event.isFromUser(userId)) {
      throw new ForbiddenException('You are not allowed to update this event');
    }
    event.updateStatus(nextStatus);
    const eventUpdated = await this.eventsRepository.update(event);
    this.logger.log(`Event with id ${eventUpdated.id.value} updated`);
    return EventMapper.toDto(eventUpdated);
  }

  async delete(id: UUID, userId: string): Promise<void> {
    const event = await this.eventsRepository.findOne(id);
    if (!event.isFromUser(userId)) {
      throw new ForbiddenException('You are not allowed to delete this event');
    }
    this.logger.log(`Event with id ${id.value} deleted`);
    await this.eventsRepository.delete(id);
  }

  async findOne(id: UUID, userId: string): Promise<EventDto> {
    const event = await this.eventsRepository.findOne(id);
    if (!event.isFromUser(userId)) {
      throw new ForbiddenException('You are not allowed to see this event');
    }
    this.logger.log(`Event with id ${id.value} found`);
    return EventMapper.toDto(event);
  }
}
