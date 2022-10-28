import storiesApi from "services/api/storiesApi";

function useStories() {
  async function fetchNonProfitStories(NonProfitId: number) {
    const { data: stories } = await storiesApi.getNonProfitStories(NonProfitId);

    return stories;
  }

  return {
    fetchNonProfitStories,
  };
}

export default useStories;
