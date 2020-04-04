import User from '../../../../db/entity/user';

export default async (email: string): Promise<boolean> => {
  const checkEmail: User = await User.findOne({ email });

  return !!checkEmail;
};
