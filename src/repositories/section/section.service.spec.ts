import { Repository } from 'typeorm';

import { InscriptionService } from '../inscription/inscription.service';
import { ScheduleService } from '../schedule/schedule.service';
import { Section } from './entities';
import { SectionService } from './section.service';

describe('SectionService', () => {
  let service: SectionService;
  const current = {
    id: 1,
    name: '01',
    capacity: 30,
    subject: { id: 7 },
    period: { id: 3 },
    teacher: { id: 5 },
  };
  const repository = {
    findOne: jest.fn(({ where }) => (where.id === 1 ? current : null)),
    save: jest.fn(async (item) => item),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Instancia directa: la dependencia circular con InscriptionService impide resolverla con Nest.
    service = new SectionService(
      repository as unknown as Repository<Section>,
      {} as ScheduleService,
      {} as InscriptionService,
    );
  });

  it('actualiza solo los campos enviados y valida el nombre con los datos actuales', async () => {
    await service.update(1, { capacity: 40 });

    expect(repository.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          name: '01',
          subject: { id: 7 },
          period: { id: 3 },
        }),
      }),
    );
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, capacity: 40, teacher: undefined }),
    );
  });

  it('quita el profesor con teacher: null', async () => {
    await service.update(1, { teacher: null });

    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, teacher: null }),
    );
  });
});
