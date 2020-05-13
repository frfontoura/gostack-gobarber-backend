import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availabitlity from provider', async () => {
    const appointments = [];
    for (let hourOfDay = 8; hourOfDay <= 17; hourOfDay++) {
      appointments.push(
        fakeAppointmentsRepository.create({
          user_id: 'user_id',
          provider_id: 'user',
          date: new Date(2020, 4, 20, hourOfDay, 0, 0),
        }),
      );
    }

    await Promise.all(appointments);

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availabitlity = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availabitlity).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 19, available: true },
      ]),
    );
  });
});
