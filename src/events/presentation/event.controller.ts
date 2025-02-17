import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventsService } from '../application/events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { ListEventsDto } from './dtos/list-events.dto';
import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller({ path: 'events', version: '1' })
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiExtraModels(ListPaginationDto, ListEventsDto)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ListPaginationDto) },
        {
          properties: {
            items: {
              $ref: getSchemaPath(ListEventsDto),
            },
          },
        },
      ],
    },
  })
  @Get()
  pagination(
    @Query() pagination: PaginationParamsDto,
  ): Promise<ListPaginationDto<ListEventsDto>> {
    return this.eventsService.findWithPagination(pagination);
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
