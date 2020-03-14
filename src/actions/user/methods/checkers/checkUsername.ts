import User from '../../../../db/entity/user';

export default async (username: string) => {
  const checkUsername: User = await User.findOne({ username });

  return !!checkUsername;
};
