import { Number } from 'src/shared/domain/value-objects/number.value-object';
import { EventAggregate } from '../domain/entities/event-aggregate.entity';
import { EventTicket } from '../domain/entities/event-ticket.entity';
import { TicketType } from '../domain/value-objects/ticket-types.value-object';
import { Benefits } from '../domain/value-objects/benefits.value-object';
import { Description } from '../domain/value-objects/description.value-object';
import { DateValue } from 'src/shared/domain/value-objects/date-value.value-object';
import { Location } from '../domain/value-objects/location.value-object';
import { EventStatus } from '../domain/value-objects/event-status.value-object';
import { Title } from '../domain/value-objects/title.value-object';
import { Event } from '../infraestructure/schemas/event.schema';
import { EventDto } from '../presentation/dtos/event.dto';
import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';
import { EventResponseDto } from '../presentation/dtos/event-response.dto';

export class EventMapper {
  static toDomain(eventRaw: any): EventAggregate {
    const tickets = eventRaw.tickets?.map((ticket) => {
      return EventTicket.create(
        {
          type: TicketType.create(ticket.type),
          price: Number.create(ticket.price),
          available: Number.create(ticket.available),
          purchaseLimit: Number.create(ticket.purchaseLimit),
          benefits: Benefits.create(ticket.benefits),
        },
        UUID.from(ticket.id),
      );
    });
    const event = EventAggregate.create(
      {
        userId: eventRaw.userId,
        description: Description.create(eventRaw.description),
        startDate:
          typeof eventRaw.startDate === 'string'
            ? DateValue.createFromString(eventRaw.startDate)
            : DateValue.createFromJSDate(eventRaw.startDate),
        endDate:
          typeof eventRaw.endDate === 'string'
            ? DateValue.createFromString(eventRaw.endDate)
            : DateValue.createFromJSDate(eventRaw.endDate),
        location: Location.create(
          eventRaw.location.latitude,
          eventRaw.location.longitude,
        ),
        status: EventStatus.create(eventRaw.status),
        title: Title.create(eventRaw.title),
        tickets,
      },
      UUID.from(eventRaw.id),
    );
    return event;
  }

  static toPersistance(event: EventAggregate): Event {
    return {
      id: event.id.value,
      userId: event.userId,
      title: event.title.value,
      description: event.description.value,
      status: event.status.value,
      startDate: event.startDate.date,
      endDate: event.endDate.date,
      location: {
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      },
      tickets: event.tickets.map((ticket) => {
        return {
          id: ticket.id.value,
          type: ticket.type.value,
          price: ticket.price.value,
          available: ticket.available.value,
          purchaseLimit: ticket.purchaseLimit.value,
          benefits: ticket.benefits.value,
        };
      }),
    };
  }

  static toDto(event: EventAggregate): EventDto {
    return {
      id: event.id.value,
      title: event.title.value,
      description: event.description.value,
      status: event.status.value,
      startDate: event.startDate.formatedDate,
      endDate: event.endDate.formatedDate,
      location: {
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      },
      tickets: event.tickets.map((ticket) => {
        return {
          id: ticket.id.value,
          type: ticket.type.value,
          price: ticket.price.value,
          available: ticket.available.value,
          purchaseLimit: ticket.purchaseLimit.value,
          benefits: ticket.benefits.value,
        };
      }),
    };
  }

  static toDtoResponse(event: EventAggregate): EventResponseDto {
    return {
      id: event.id.value,
      title: event.title.value,
      description: event.description.value,
      status: event.status.value,
      date: event.getFormatedDate(),
      ticketsAvailable: event.getTicketsAvailable(),
    };
  }
}
