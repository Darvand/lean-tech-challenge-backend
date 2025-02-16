import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop({
    type: mongoose.Schema.Types.UUID,
    default: mongoose.Types.UUID.generate(),
  })
  id: string;

  @Prop()
  type: string;

  @Prop()
  price: number;

  @Prop()
  available: number;

  @Prop()
  purchaseLimit: number;

  @Prop()
  benefits: string[];

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
