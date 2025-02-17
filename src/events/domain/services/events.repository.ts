import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { EventAggregate } from '../entities/event-aggregate.entity';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';

export interface EventsRepository {
  findWithPagination(
    paginationParamsDto: PaginationParamsDto,
  ): Promise<ListPaginationDto<EventAggregate>>;
  findOne(id: string): Promise<EventAggregate>;
  create(event: EventAggregate): Promise<void>;
  update(event: EventAggregate): Promise<void>;
  delete(id: string): Promise<void>;
}
