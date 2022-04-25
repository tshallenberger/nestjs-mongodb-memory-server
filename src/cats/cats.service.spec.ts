import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/CreateCatDto';
import { Cat, CatDocument } from './schemas/cat.schema';

describe('CatsService', () => {
  let service: CatsService;

  const mockCat: Cat = {
    name: 'Test',
    age: 1,
    breed: 'Breed',
  };
  const CatModelToken = getModelToken(Cat.name);
  let model: Model<CatDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CatModelToken,
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
          },
        },
        CatsService,
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    model = await module.resolve<Model<CatDocument>>(CatModelToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsert', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it(`should upsert a Cat in MongoDB`, async () => {
      expect(service.upsert).toBeDefined();

      model.findByIdAndUpdate = jest.fn().mockResolvedValue({
        save: jest.fn().mockResolvedValue(mockCat),
      });

      const dto = new CreateCatDto();
      dto.age = mockCat.age;
      dto.breed = mockCat.breed;
      dto.age = mockCat.age;

      const result = await service.upsert(dto);

      expect(result).toEqual(mockCat);
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
