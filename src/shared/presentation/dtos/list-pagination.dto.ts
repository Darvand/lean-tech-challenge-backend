export class ListPaginationDto<T> {
  readonly items: T[];
  readonly total: number;
  readonly limit: number;
  readonly page: number;
}
