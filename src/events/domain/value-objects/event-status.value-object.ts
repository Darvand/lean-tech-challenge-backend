import { ValueObject } from '../../../shared/domain/value-objects/value-object';

export const EventStatusValues = ['draft', 'published', 'unpublished'] as const;
type EventStatusType = (typeof EventStatusValues)[number];

interface EventStatusProps {
  value: EventStatusType;
}

export class EventStatus extends ValueObject<EventStatusProps> {
  get value(): EventStatusType {
    return this.props.value;
  }

  private constructor(props: EventStatusProps) {
    super(props);
  }

  static create(value: string): EventStatus {
    if (!EventStatusValues.includes(value as EventStatusType)) {
      throw new Error(`Invalid event status: ${value}`);
    }
    return new EventStatus({ value: value as EventStatusType });
  }

  isValidTransitionTo(nextStatus: EventStatus): boolean {
    if (this.value === 'draft' && nextStatus.value === 'published') {
      return true;
    }
    if (this.value === 'published' && nextStatus.value === 'unpublished') {
      return true;
    }
    return false;
  }
}
