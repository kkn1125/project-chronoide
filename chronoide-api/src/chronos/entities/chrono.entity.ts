import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChronoTaskDocument = HydratedDocument<ChronoTask>;

const ChronoFileType = {
  Folder: 'folder',
  Task: 'task',
} as const;
type ChronoFileType = (typeof ChronoFileType)[keyof typeof ChronoFileType];

interface Chrono {
  _id: Types.ObjectId;
  type: 'folder' | 'task';
  name: string;
  group: string;
  order: number;
  depth: number;
}

@Schema()
export class ChronoTask implements Chrono {
  @Prop({ default: new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: String, enum: ChronoFileType, default: 'folder' })
  type: 'folder' | 'task';

  @Prop({ type: String, default: 'no name' })
  name: string;

  @Prop({ type: String, default: 'no group' })
  group: string;

  @Prop({ type: Number, default: -1 })
  order: number;

  @Prop({ type: Number, default: 0 })
  depth: number;

  @Prop({ type: String })
  parent: string;

  @Prop({ type: String, default: 'no title' })
  title: string;

  @Prop({ type: String, default: 'no content' })
  content: string;

  @Prop({ type: Date, default: Date.now })
  start_at: Date;

  @Prop({ type: Date, default: Date.now })
  end_at: Date;

  @Prop({ type: Boolean, default: false })
  withHoliday: boolean;
}
export const ChronoTaskSchema = SchemaFactory.createForClass(ChronoTask);

export type ChronoFolderDocument = HydratedDocument<ChronoFolder>;

@Schema()
export class ChronoFolder implements Chrono {
  @Prop({ default: new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: String, enum: ChronoFileType, default: 'folder' })
  type: 'folder' | 'task';

  @Prop({ default: 'no name' })
  name: string;

  @Prop({ default: 'no group' })
  group: string;

  @Prop({ default: -1 })
  order: number;

  @Prop({ default: 0 })
  depth: number;

  @Prop({ type: String })
  parent: string;

  @Prop({ type: Boolean, default: false })
  root: boolean;

  @Prop({
    type: [
      { type: Types.ObjectId, ref: 'ChronoFolder' },
      { type: Types.ObjectId, ref: 'ChronoTask' },
    ],
    default: [],
  })
  childrens: (ChronoFolder | ChronoTask)[];
}

export const ChronoFolderSchema = SchemaFactory.createForClass(ChronoFolder);
