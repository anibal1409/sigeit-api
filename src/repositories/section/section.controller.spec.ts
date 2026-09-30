import { Test, TestingModule } from '@nestjs/testing';

import { SectionTeacherService } from './section-teacher.service';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

describe('SectionController', () => {
  let controller: SectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        { provide: SectionService, useValue: {} },
        { provide: SectionTeacherService, useValue: {} },
      ],
    }).compile();

    controller = module.get<SectionController>(SectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
