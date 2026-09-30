import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Section } from '../section/entities';
import { Teacher } from './entities';
import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        { provide: getRepositoryToken(Teacher), useValue: {} },
        { provide: getRepositoryToken(Section), useValue: {} },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
