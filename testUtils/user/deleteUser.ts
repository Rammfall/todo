import User from '../../src/db/entity/user';

const deleteUser = async (user: User) => {
  return await user.remove();
};

export default deleteUser;
