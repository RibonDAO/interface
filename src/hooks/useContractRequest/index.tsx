import { useQuery, UseQueryOptions } from "@ribon.io/shared/hooks";
import { logError } from "services/crashReport";

interface Props {
  key: string;
  fetchMethod(): Promise<any>;
  options?: UseQueryOptions<any, Error, any>;
}
export function useContractRequest<T>({ key, fetchMethod, options }: Props) {
  const { isLoading, error, data, refetch } = useQuery<T, Error>(
    key,
    async () => {
      const fetchData = await fetchMethod();
      if (error)
        logError(error, {
          customMessage: `An error occurred when fetching ${key}`,
        });

      return fetchData;
    },
    options,
  );

  return {
    isLoading,
    error,
    data,
    refetch,
  };
}
