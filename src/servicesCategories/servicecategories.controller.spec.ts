import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCategoryController } from './servicecategories.controller';

describe('ServicesCategoryController', () => {
  let controller: ServicesCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesCategoryController],
    }).compile();

    controller = module.get<ServicesCategoryController>(ServicesCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
