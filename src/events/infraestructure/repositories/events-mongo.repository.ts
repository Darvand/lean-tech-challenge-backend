import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../../domain/services/events.repository';
import { EventAggregate } from '../../domain/entities/event-aggregate.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schemas/event.schema';
import { Model } from 'mongoose';
import { EventMapper } from 'src/events/mappers/event.mapper';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';
import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';

const LIMIT_MAX = 100;
@Injectable()
export class EventsMongoRepository implements EventsRepository {
  constructor(@InjectModel(Event.name) private readonly model: Model<Event>) {}

  async findWithPagination(
    paginationParamsDto: PaginationParamsDto,
  ): Promise<ListPaginationDto<EventAggregate>> {
    const eventAmount = await this.model.countDocuments().exec();
    const limit =
      paginationParamsDto.limit > LIMIT_MAX
        ? LIMIT_MAX
        : paginationParamsDto.limit;
    const events = await this.model
      .find()
      .skip((paginationParamsDto.page - 1) * limit)
      .limit(limit)
      .exec();
    return {
      total: eventAmount,
      items: events.map(EventMapper.toDomain),
      page: paginationParamsDto.page,
      limit,
    };
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
