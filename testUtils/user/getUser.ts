import User from '../../src/db/entity/user';

const getUser = async (id: number) => {
  return await User.findOne({ id });
};

export default getUser;
