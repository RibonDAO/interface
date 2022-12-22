import { useHistory, useLocation } from "react-router-dom";

export function useLocationSearch() {
  const { search, pathname } = useLocation();
  const history = useHistory();

  function updateLocationSearch(key: string, value: string) {
    if ("URLSearchParams" in window) {
      const searchParams = new URLSearchParams(search);
      searchParams.set(key, value);
      const newRelativePathQuery = `${searchParams.toString()}`;
      history.push({ pathname, search: newRelativePathQuery });
    }
  }

  return {
    search,
    history,
    updateLocationSearch,
  };
}
