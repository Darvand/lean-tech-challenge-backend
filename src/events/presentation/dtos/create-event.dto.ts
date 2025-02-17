import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TicketTypesValues } from 'src/events/domain/value-objects/ticket-types.value-object';
import { DateValue } from 'src/shared/domain/value-objects/date-value.value-object';
import { IsValidValueObject } from 'src/shared/presentation/is-valid-value-object.validator';

class CreateTicketDto {
  @IsIn(TicketTypesValues)
  @ApiProperty({ enum: TicketTypesValues })
  type: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  available: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  purchaseLimit: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty()
  benefits: string[];
}

class CreateLocationDto {
  @IsNumber()
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @ApiProperty()
  longitude: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsValidValueObject(DateValue.createFromString)
  @ApiProperty()
  startDate: Date;

  @IsString()
  @IsNotEmpty()
  @IsValidValueObject(DateValue.createFromString)
  @ApiProperty()
  endDate: Date;

  @Type(() => CreateLocationDto)
  @IsObject()
  @ValidateNested()
  @ApiProperty()
  location: CreateLocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTicketDto)
  @ApiProperty({ type: [CreateTicketDto] })
  tickets: CreateTicketDto[];
}
