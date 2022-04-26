import {
  getModelToken,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/CreateCatDto';
import { Cat, CatDocument, CatSchema } from './schemas/cat.schema';

import {
  closeMongoConnection,
  rootMongooseTestModule,
} from '../jest/mongodb-memory-server';

describe('CatsService', () => {
  let service: CatsService;
  const catModelToken = getModelToken(Cat.name);
  let catModel: Model<CatDocument>;
  let mockCat: Cat = {
    name: 'Test',
    age: 1,
    breed: 'Breed',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
      ],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catModel = await module.resolve<Model<CatDocument>>(catModelToken);
  });
  
  afterAll(async () => {
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsert', () => {
    it('should be defined', () => {
      expect(service.upsert).toBeDefined();
    });
    it(`should upsert a Cat in MongoDB`, async () => {
      const dto = new CreateCatDto();
      dto.age = mockCat.age;
      dto.breed = mockCat.breed;
      dto.age = mockCat.age;
      dto.name = mockCat.name;
      const result = await service.upsert(dto);

      expect(result).toMatchObject(mockCat);
    });
  });
  describe('findAll', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it(`should return all cats in collection`, async () => {
      expect(service.findAll).toBeDefined();
    });
  });
});
