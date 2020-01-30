import User from '../../../db/entity/user';

export default async (username: string, email: string, password: string) => {
  const user: User = new User();
  user.username = username;
  user.email = email;
  user.password = password;

  return await user.save();
};
