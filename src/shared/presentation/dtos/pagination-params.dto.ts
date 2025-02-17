import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly limit?: number = 10;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly page?: number = 1;
}
