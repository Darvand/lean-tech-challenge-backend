import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from '../application/events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventDto } from './dtos/event.dto';
import { ListPaginationDto } from 'src/shared/presentation/dtos/list-pagination.dto';
import { PaginationParamsDto } from 'src/shared/presentation/dtos/pagination-params.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UpdateStatusDto } from 'src/shared/presentation/dtos/update-status.dto';
import { EventStatus } from '../domain/value-objects/event-status.value-object';
import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';

@ApiTags('Events')
@Controller({ path: 'events', version: '1' })
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiExtraModels(ListPaginationDto, EventDto)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ListPaginationDto) },
        {
          properties: {
            items: {
              $ref: getSchemaPath(EventDto),
            },
          },
        },
      ],
    },
  })
  @Get()
  pagination(
    @Query() pagination: PaginationParamsDto,
  ): Promise<ListPaginationDto<EventDto>> {
    return this.eventsService.findWithPagination(pagination);
  }

  @ApiCreatedResponse({
    description: 'The event has been successfully created.',
    type: EventDto,
  })
  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDto> {
    return this.eventsService.create(createEventDto);
  }

  @ApiOkResponse({ type: EventDto })
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<EventDto> {
    return this.eventsService.updateStatus(
      UUID.from(id),
      EventStatus.create(updateStatusDto.status),
    );
  }

  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.eventsService.delete(UUID.from(id));
  }

  @ApiOkResponse({ type: EventDto })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventDto> {
    return this.eventsService.findOne(UUID.from(id));
  }
}
