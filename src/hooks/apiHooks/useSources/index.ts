import sourcesApi from "services/api/sourcesApi";

function useSources() {
  async function createSource(userId: number, integrationId: number) {
    const { data: source } = await sourcesApi.postCreateSource(
      userId,
      integrationId,
    );

    return source;
  }

  return {
    createSource,
  };
}

export default useSources;
