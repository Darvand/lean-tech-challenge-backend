class ListTicketsDto {
  readonly id: string;
  readonly type: string;
  readonly price: number;
  readonly available: number;
  readonly purchaseLimit: number;
  readonly benefits: string[];
}

class LocationDto {
  readonly latitude: number;
  readonly longitude: number;
}

export class ListEventsDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly location: LocationDto;
  readonly tickets: ListTicketsDto[];
}
