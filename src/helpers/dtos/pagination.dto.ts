import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export default class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take?: number;
}
