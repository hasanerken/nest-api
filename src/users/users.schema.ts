import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, index: true, unique: true })
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
