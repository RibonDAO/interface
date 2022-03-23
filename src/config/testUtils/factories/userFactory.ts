import User from "types/entities/User";

function userFactory(params: Partial<User> = {}): User {
  const defaultValues: User = {
    email: "user@email.com",
    id: 1,
  };
  return Object.assign(defaultValues, params) as User;
}

export default userFactory;
