import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Peter Quil',
      email: 'starlord@avengers.com',
    });

    expect(updatedUser.name).toBe('Peter Quil');
    expect(updatedUser.email).toBe('starlord@avengers.com');
  });

  it('should not be able to update the email to another users email', async () => {
    await fakeUsersRepository.create({
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Peter Quil',
      email: 'starlord@avengers.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Peter Quil',
        email: 'ironman@avengers.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      old_password: '123456',
      password: 'new-password',
    });

    expect(updatedUser.password).toBe('new-password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Tony Stark',
        email: 'ironman@avengers.com',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tony Stark',
      email: 'ironman@avengers.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Tony Stark',
        email: 'ironman@avengers.com',
        old_password: 'wrong-old-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'Tony Stark',
        email: 'ironman@avengers.com',
        old_password: 'wrong-old-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
