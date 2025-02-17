import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { EventAggregate } from '../entities/event-aggregate.entity';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';
import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';

export interface EventsRepository {
  findWithPagination(
    paginationParamsDto: PaginationParamsDto,
  ): Promise<ListPaginationDto<EventAggregate>>;
  findOne(id: UUID): Promise<EventAggregate>;
  create(event: EventAggregate): Promise<EventAggregate>;
  update(event: EventAggregate): Promise<EventAggregate>;
  delete(id: UUID): Promise<void>;
}
