import userApi from "services/api/usersApi";
import { useCurrentUser } from "contexts/currentUserContext";
import { useApi } from "hooks/useApi";
import { UserStatistics } from "types/entities/userStatistics";

function useUserStatistics() {
  const { currentUser } = useCurrentUser();
  const { data: userStatistics } = useApi<UserStatistics>({
    key: "statistics",
    fetchMethod: () => {
      const id = currentUser?.id || null;
      return userApi.getUserStatistics(id ?? 0);
    },
    options: {
      enabled: !!currentUser?.id,
    },
  });

  return {
    userStatistics,
  };
}

export default useUserStatistics;
