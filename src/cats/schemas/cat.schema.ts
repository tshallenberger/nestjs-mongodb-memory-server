import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({ collection: 'cats' })
export class Cat {
  _id?: Types.ObjectId | undefined;
  id?: string | undefined;
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
