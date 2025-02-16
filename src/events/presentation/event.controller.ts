import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from '../application/events.service';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller({ path: 'events', version: '1' })
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
