import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { EventStatusValues } from 'src/events/domain/value-objects/event-status.value-object';

export class UpdateStatusDto {
  @IsIn(EventStatusValues)
  @ApiProperty({ enum: EventStatusValues })
  status: string;
}
