import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, index: true, unique: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  quantity: number;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  isPublished: true;

  @Prop()
  @ApiProperty()
  itemOwner: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
