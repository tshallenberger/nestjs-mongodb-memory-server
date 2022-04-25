import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/CreateCatDto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async upsert(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.findByIdAndUpdate(
      createCatDto.id,
      createCatDto,
      {
        useFindAndModify: true,
        upsert: true,
        new: true,
      },
    );
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
