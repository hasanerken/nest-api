import { ApiProperty } from '@nestjs/swagger';

export class Item {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  quantity: number;
}
