import User from '../../../../db/entity/user';

const checkEmail = async (email: string): Promise<boolean> => {
  const user: User | undefined = await User.findOne({ email });

  return !!user;
};

export default checkEmail;
