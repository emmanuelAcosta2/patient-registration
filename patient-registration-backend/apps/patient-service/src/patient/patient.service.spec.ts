import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let controller: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    controller = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
