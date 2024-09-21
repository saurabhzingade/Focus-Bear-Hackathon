import { Test, TestingModule } from '@nestjs/testing';
import { UnlockRequestController } from './unlock.request.controller';

describe('UnlockRequestController', () => {
  let controller: UnlockRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnlockRequestController],
    }).compile();

    controller = module.get<UnlockRequestController>(UnlockRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
