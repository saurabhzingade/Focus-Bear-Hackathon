import { Test, TestingModule } from '@nestjs/testing';
import { UnlockRequestService } from './unlock.request.service';

describe('UnlockRequestService', () => {
  let service: UnlockRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnlockRequestService],
    }).compile();

    service = module.get<UnlockRequestService>(UnlockRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
