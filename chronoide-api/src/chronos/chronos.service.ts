import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateChronoTaskDto } from './dto/create-chrono-task.entity';
import { UpdateChronoDto } from './dto/update-chrono.dto';
import { ChronoFolder, ChronoTask } from './entities/chrono.entity';
import { ChronoTree } from './entities/chrono.tree.entity';

@Injectable()
export class ChronosService {
  constructor(
    @InjectModel(ChronoTree.name)
    private chronoTreeModel: Model<ChronoTree>,
    @InjectModel(ChronoFolder.name)
    private chronoFolderModel: Model<ChronoFolder>,
  ) {}

  private findChildrens(id: string) {
    return this.chronoTreeModel
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(id) },
        },
        {
          $graphLookup: {
            from: 'chronotrees',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent',
            as: 'children',
            maxDepth: 20, // 원하는 깊이까지 탐색
            depthField: 'depth',
          },
        },
      ])
      .exec();
  }

  async create() {
    const treeModel = await this.chronoTreeModel.create({});
    return treeModel.toJSON();
  }

  async createFolderIn(folderId: string) {
    let treeModel = await this.chronoTreeModel.findOne({
      _id: new Types.ObjectId(folderId),
    });
    if (!treeModel) {
      const result = await this.findChildrens(folderId);

      if (result.length === 0) {
        console.log('not found');
      } else {
        treeModel = result[0];
      }
    }

    const folder = await this.chronoFolderModel.create({
      parent: folderId,
      root: false,
    });

    treeModel.childrens.push(folder);

    const tree = await treeModel.save();

    // const chronoFolder = new ChronoFolder();
    // Object.assign(chronoFolder, createChronoFolderDto);

    // treeModel.childrens.push(chronoFolder);

    return tree.toJSON();
  }

  async createTaskIn(
    folderId: string,
    createChronoTaskDto: CreateChronoTaskDto,
  ) {
    let treeModel = await this.chronoTreeModel.findOne({
      _id: new Types.ObjectId(folderId),
    });
    if (!treeModel) {
      const result = await this.findChildrens(folderId);

      if (result.length === 0) {
        console.log('not found');
      } else {
        treeModel = result[0];
      }
    }

    const task = new ChronoTask();

    Object.assign(task, createChronoTaskDto);

    treeModel.childrens.push(task);

    return treeModel.toJSON();
  }

  findAll() {
    return `This action returns all chronos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chrono`;
  }

  update(id: number, updateChronoDto: UpdateChronoDto) {
    updateChronoDto;
    return `This action updates a #${id} chrono`;
  }

  remove(id: number) {
    return `This action removes a #${id} chrono`;
  }
}
