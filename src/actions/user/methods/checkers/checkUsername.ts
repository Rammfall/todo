import User from '../../../../db/entity/user';

const checkUsername = async (username: string): Promise<boolean> => {
  const user: User | undefined = await User.findOne({ username });

  return !!user;
};

export default checkUsername;
