import { MinLength } from 'class-validator';

export class roleCreateDto {
  @MinLength(3)
  name: string;

  permissions: number[];
}
