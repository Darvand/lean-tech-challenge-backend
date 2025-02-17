import { ApiProperty } from '@nestjs/swagger';

export class ListPaginationDto<T> {
  @ApiProperty({ type: [Object] })
  readonly items: T[];
  @ApiProperty()
  readonly total: number;
  @ApiProperty()
  readonly limit: number;
  @ApiProperty()
  readonly page: number;
}
