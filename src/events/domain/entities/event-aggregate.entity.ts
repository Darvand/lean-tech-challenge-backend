import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';
import { DateValue } from 'src/shared/domain/value-objects/date-value.value-object';
import { Description } from '../value-objects/description.value-object';
import { EventStatus } from '../value-objects/event-status.value-object';
import { Location } from '../value-objects/location.value-object';
import { Title } from '../value-objects/title.value-object';
import { Entity } from 'src/shared/domain/entities/entity';
import { EventTicket } from './event-ticket.entity';
import { DomainException } from 'src/shared/presentation/exceptions/domain.exception';

export interface EventProps {
  title: Title;
  description?: Description;
  status: EventStatus;
  startDate: DateValue;
  endDate: DateValue;
  location: Location;
  tickets: EventTicket[];
}

export class EventAggregate extends Entity<EventProps> {
  private constructor(eventProps: EventProps, id?: UUID) {
    super(eventProps, id);
    const { startDate, endDate } = eventProps;
    if (startDate.isAfter(endDate)) {
      throw new DomainException('Event start date must be before end date');
    }
    if (this.tickets.length === 0) {
      throw new DomainException('Event must have at least one ticket');
    }
  }

  static create(eventProps: EventProps, id?: UUID): EventAggregate {
    return new EventAggregate(eventProps, id);
  }

  updateStatus(nextStatus: EventStatus): void {
    if (!this.status.isValidTransitionTo(nextStatus)) {
      throw new DomainException(
        `Invalid status transition from ${this.status.value} to ${nextStatus.value}`,
      );
    }
    this.props.status = nextStatus;
  }

  get id(): UUID {
    return this._id;
  }

  get title(): Title {
    return this.props.title;
  }

  get description(): Description {
    return this.props.description;
  }

  get status(): EventStatus {
    return this.props.status;
  }

  get startDate(): DateValue {
    return this.props.startDate;
  }

  get endDate(): DateValue {
    return this.props.endDate;
  }

  get location(): Location {
    return this.props.location;
  }

  get tickets(): EventTicket[] {
    return this.props.tickets;
  }
}
