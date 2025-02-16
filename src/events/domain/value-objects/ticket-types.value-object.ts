import { ValueObject } from 'src/shared/domain/value-objects/value-object';

export const TicketTypesValues = [
  'general-admission',
  'vip',
  'early-bird',
] as const;
type TicketTypeType = (typeof TicketTypesValues)[number];

interface TicketTypeProps {
  value: TicketTypeType;
}

export class TicketType extends ValueObject<TicketTypeProps> {
  get value(): TicketTypeType {
    return this.props.value;
  }

  private constructor(props: TicketTypeProps) {
    super(props);
  }

  static create(value: string): TicketType {
    if (!TicketTypesValues.includes(value as TicketTypeType)) {
      throw new Error(`Invalid ticket type: ${value}`);
    }
    return new TicketType({ value: value as TicketTypeType });
  }
}
