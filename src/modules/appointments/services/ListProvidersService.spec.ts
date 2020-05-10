import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Peter Parker',
      email: 'spiderman@avengers.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Bruce Banner',
      email: 'hulk@avengers.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
