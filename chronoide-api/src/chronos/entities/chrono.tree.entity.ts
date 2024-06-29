import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ChronoFolder, ChronoTask } from './chrono.entity';

export type ChronoTreeDocument = HydratedDocument<ChronoTree>;

@Schema()
export class ChronoTree {
  @Prop({ default: new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({
    type: [
      { type: Types.ObjectId, ref: 'ChronoFolder' },
      { type: Types.ObjectId, ref: 'ChronoTask' },
    ],
    default: [],
  })
  childrens: (ChronoFolder | ChronoTask)[];
}

export const ChronoTreeSchema = SchemaFactory.createForClass(ChronoTree);
