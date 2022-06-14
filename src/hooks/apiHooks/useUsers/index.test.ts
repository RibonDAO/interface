import { renderHook } from "@testing-library/react-hooks";
import usersApi from "services/api/usersApi";
import useUsers from ".";

describe("useUsers", () => {
  let hook: ReturnType<typeof useUsers>;
  const testEmail = "test@email.com";
  const data = { name: "test user" };

  beforeEach(() => {
    const { result } = renderHook(() => useUsers());
    hook = result.current;
  });
  
  describe("#findUser", () => {
    beforeEach(() => {
      usersApi.postSearchUser = jest.fn(() => ({ data } as any));
    });

    it("calls the usersApi searchUser with correct params", () => {
      hook.findUser(testEmail);

      expect(usersApi.postSearchUser).toHaveBeenCalledWith(testEmail);
    });

    it("returns the data fetched from the api", async () => {
      const findResultResult = await hook.findUser(testEmail);
      expect(findResultResult).toEqual(data);
    });
  });

  describe("#createUser", () => {
    beforeEach(() => {
      usersApi.postCreateUser = jest.fn(() => ({ data } as any));
    });

    it("calls the usersApi createUser with correct params", () => {
      hook.createUser(testEmail);

      expect(usersApi.postCreateUser).toHaveBeenCalledWith(testEmail);
    });

    it("returns the data fetched from the api", async () => {
      const findResultResult = await hook.createUser(testEmail);
      expect(findResultResult).toEqual(data);
    });
  });

  describe("#findOrCreateUser", () => {
    describe("when user exixts on the database", () => {
      beforeEach(() => {
        usersApi.postSearchUser = jest.fn(() => ({ data } as any));
      });
  
      it("calls the usersApi searchUser with correct params", () => {
        hook.findOrCreateUser(testEmail);
  
        expect(usersApi.postSearchUser).toHaveBeenCalledWith(testEmail);
      });
  
      it("returns the data fetched from the api", async () => {
        const findResultResult = await hook.findOrCreateUser(testEmail);
        expect(findResultResult).toEqual(data);
      });
    });

    describe("when user don't exists on the database", () => {
      const createdUser = { name: "newly created user" }

      beforeEach(() => {
        usersApi.postSearchUser = jest.fn(() => { throw new Error() });
        usersApi.postCreateUser = jest.fn(() => ({ data: createdUser } as any));
      });
  
      it("calls the usersApi searchUser with correct params and throws an error", () => {
        hook.findOrCreateUser(testEmail);
  
        expect(usersApi.postSearchUser).toHaveBeenCalledWith(testEmail);
        expect(usersApi.postSearchUser).toThrow();
      });

      it("calls the usersApi createUser with correct params", () => {
        hook.createUser(testEmail);

        expect(usersApi.postCreateUser).toHaveBeenCalledWith(testEmail);
      });


      it("creates an user and returns the data", async () => {
        const findResultResult = await hook.findOrCreateUser(testEmail);
        expect(findResultResult).toEqual(createdUser);
      });
    });
  });
});
