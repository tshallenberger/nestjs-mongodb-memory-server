import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/CreateCatDto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async upsert(dto: CreateCatDto): Promise<Cat> {
    if (dto.id?.length) {
      return await this.catModel.findByIdAndUpdate(dto.id, dto);
    } else {
      return await this.catModel.create(dto);
    }
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
