import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/CreateCatDto';
import { Cat, CatDocument } from './schemas/cat.schema';
import mongoose from 'mongoose';

describe('CatsService', () => {
  let service: CatsService;

  const mockCat: Cat = {
    name: 'Test',
    age: 1,
    breed: 'Breed',
  };
  const catModelToken = getModelToken(Cat.name);
  let catModel: Model<CatDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: catModelToken,
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
          },
        },
        CatsService,
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catModel = await module.resolve<Model<CatDocument>>(catModelToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsert', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    describe('given null ID', () => {
      it(`should create a Cat in MongoDB`, async () => {
        expect(service.upsert).toBeDefined();

        catModel.create = jest.fn().mockResolvedValue(mockCat);

        const dto = new CreateCatDto();
        dto.age = mockCat.age;
        dto.breed = mockCat.breed;
        dto.age = mockCat.age;

        const result = await service.upsert(dto);

        expect(result).toEqual(mockCat);
      });
    });
    describe('given valid ID', () => {
      it(`should findByIdAndUpdate a Cat in MongoDB`, async () => {
        expect(service.upsert).toBeDefined();

        catModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockCat);

        const dto = new CreateCatDto();
        dto.id = mongoose.Types.ObjectId.generate().toString();
        dto.age = mockCat.age;
        dto.breed = mockCat.breed;
        dto.age = mockCat.age;

        const result = await service.upsert(dto);

        expect(result).toMatchObject(mockCat);
      });
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
