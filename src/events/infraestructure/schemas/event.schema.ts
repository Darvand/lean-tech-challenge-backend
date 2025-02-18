import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Ticket, TicketSchema } from './ticket.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({
    type: mongoose.Schema.Types.UUID,
    default: mongoose.Types.UUID.generate(),
  })
  id: string;

  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: { latitude: Number, longitude: Number } })
  location: {
    latitude: number;
    longitude: number;
  };

  @Prop({
    type: [{ type: TicketSchema }],
  })
  tickets: Ticket[];

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
