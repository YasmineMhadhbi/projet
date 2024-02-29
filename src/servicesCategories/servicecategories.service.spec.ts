import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCategoriesService } from './servicecategories.service';

describe('ServicesCategoriesService', () => {
  let service: ServicesCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesCategoriesService],
    }).compile();

    service = module.get<ServicesCategoriesService>(ServicesCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
