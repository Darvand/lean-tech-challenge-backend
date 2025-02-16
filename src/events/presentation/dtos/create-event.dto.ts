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
  type: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  available: number;

  @IsNumber()
  @IsPositive()
  purchaseLimit: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  benefits: string[];
}

class CreateLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsValidValueObject(DateValue.createFromString)
  startDate: Date;

  @IsString()
  @IsNotEmpty()
  @IsValidValueObject(DateValue.createFromString)
  endDate: Date;

  @Type(() => CreateLocationDto)
  @IsObject()
  @ValidateNested()
  location: CreateLocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTicketDto)
  tickets: CreateTicketDto[];
}
