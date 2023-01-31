import userApi from "services/api/usersApi";
import { useCurrentUser } from "contexts/currentUserContext";
import { useApi } from "hooks/useApi";
import { UserStatistics } from "types/entities/userStatistics";
import { emptyRequest } from "services/api";

function useUserStatistics() {
  const { currentUser } = useCurrentUser();
  const { data: userStatistics } = useApi<UserStatistics>({
    key: "statistics",
    fetchMethod: () => {
      if (!currentUser?.id) return emptyRequest();
      return userApi.getUserStatistics(currentUser.id);
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
