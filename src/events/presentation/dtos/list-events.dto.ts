import { ApiProperty } from '@nestjs/swagger';

class ListTicketsDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly type: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly available: number;
  @ApiProperty()
  readonly purchaseLimit: number;
  @ApiProperty()
  readonly benefits: string[];
}

class LocationDto {
  @ApiProperty()
  readonly latitude: number;
  @ApiProperty()
  readonly longitude: number;
}

export class ListEventsDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly status: string;
  @ApiProperty()
  readonly startDate: string;
  @ApiProperty()
  readonly endDate: string;
  @ApiProperty({ type: LocationDto })
  readonly location: LocationDto;
  @ApiProperty({ type: [ListTicketsDto] })
  readonly tickets: ListTicketsDto[];
}
