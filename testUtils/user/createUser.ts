import User from '../../src/db/entity/user';

const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const user: User = new User();

  user.email = email;
  user.username = username;
  user.password = password;

  return await user.save();
};

export default createUser;
