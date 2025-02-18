import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
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
import { EventResponseDto } from './dtos/event-response.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Events')
@Controller({ path: 'events', version: '1' })
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
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
    @Req() req: any,
    @Query() pagination: PaginationParamsDto,
  ): Promise<ListPaginationDto<EventResponseDto>> {
    this.logger.log(`User with id ${req.user.sub} is requesting list events`);
    return this.eventsService.findWithPagination(pagination, req.user.sub);
  }

  @ApiCreatedResponse({
    description: 'The event has been successfully created.',
    type: EventDto,
  })
  @Post()
  create(
    @Req() req: any,
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventDto> {
    this.logger.log(`User with id ${req.user.sub} is creating a new event`);
    return this.eventsService.create(createEventDto, req.user.sub);
  }

  @ApiOkResponse({ type: EventDto })
  @Patch(':id')
  updateStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<EventDto> {
    this.logger.log(
      `User with id ${req.user.sub} is updating status of event with id ${id}`,
    );
    return this.eventsService.updateStatus(
      UUID.from(id),
      EventStatus.create(updateStatusDto.status),
      req.user.sub,
    );
  }

  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Req() req: any, @Param('id') id: string): Promise<void> {
    this.logger.log(
      `User with id ${req.user.sub} is deleting event with id ${id}`,
    );
    return this.eventsService.delete(UUID.from(id), req.user.sub);
  }

  @ApiOkResponse({ type: EventDto })
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string): Promise<EventDto> {
    this.logger.log(
      `User with id ${req.user.sub} is requesting event with id ${id}`,
    );
    return this.eventsService.findOne(UUID.from(id), req.user.sub);
  }
}
