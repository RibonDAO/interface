import poolsApi from "services/apiTheGraph/poolsApi";

function usePools() {
  async function getAllPools() {
    const { data: pools } = await poolsApi.fetchAllPools();
    return pools;
  }

  async function getPool(id: string) {
    const { data: pool } = await poolsApi.fetchPool(id);
    return pool;
  }
  return { getAllPools, getPool };
}

export default usePools;
