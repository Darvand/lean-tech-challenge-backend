import { Entity } from '../../../shared/domain/entities/entity';
import { TicketType } from '../value-objects/ticket-types.value-object';
import { Number } from '../../../shared/domain/value-objects/number.value-object';
import { Benefits } from '../value-objects/benefits.value-object';
import { UUID } from '../../../shared/domain/value-objects/uuid.value-object';

interface TicketProps {
  type: TicketType;
  price: Number;
  available: Number;
  purchaseLimit: Number;
  benefits: Benefits;
}

export class EventTicket extends Entity<TicketProps> {
  private constructor(props: TicketProps, id?: UUID) {
    super(props, id);
    if (this.benefits.value.length === 0) {
      throw new Error('Benefits cannot be empty');
    }
  }

  static create(props: TicketProps, id?: UUID): EventTicket {
    return new EventTicket(props, id);
  }

  get id(): UUID {
    return this._id;
  }

  get type(): TicketType {
    return this.props.type;
  }

  get price(): Number {
    return this.props.price;
  }

  get available(): Number {
    return this.props.available;
  }

  get purchaseLimit(): Number {
    return this.props.purchaseLimit;
  }

  get benefits(): Benefits {
    return this.props.benefits;
  }
}
