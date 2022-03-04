import usersApi from "services/api/usersApi";

function useUsers() {
  async function findUser(email: string) {
    const { data: user } = await usersApi.postSearchUser(email);

    return user;
  }

  async function createUser(email: string) {
    const { data: user } = await usersApi.postCreateUser(email);

    return user;
  }

  async function findOrCreateUser(email: string) {
    let user;
    try {
      user = await findUser(email);
    } catch (e) {
      user = await createUser(email);
    }

    return user;
  }

  return {
    createUser,
    findUser,
    findOrCreateUser,
  };
}

export default useUsers;
