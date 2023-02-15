import { User } from "@ribon.io/shared/types";

function userFactory(params: Partial<User> = {}): User {
  const defaultValues: User = {
    email: "user@email.com",
    id: 1,
  };
  return Object.assign(defaultValues, params) as User;
}

export default userFactory;
