import User from '../../src/db/entity/user';

const createUser = async (
  username: string = 'test',
  email: string = 'test@test.te',
  password: string = 'pass'
) => {
  const user: User = new User();

  user.email = email;
  user.username = username;
  user.password = password;

  return await user.save();
};

export default createUser;
