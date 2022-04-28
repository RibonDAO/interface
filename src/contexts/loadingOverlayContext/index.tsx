import { createContext, useContext, useMemo, useState } from "react";
import LoadingOverlay from "components/moleculars/modals/LoadingOverlay";

export interface ILoadingOverlayContext {
  loading: boolean;
  showLoadingOverlay(message?: string): void;
  hideLoadingOverlay(): void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const LoadingOverlayContext = createContext<ILoadingOverlayContext>(
  {} as ILoadingOverlayContext,
);

function LoadingOverlayProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();

  function showLoadingOverlay(loadingMessage?: string) {
    setLoading(true);
    setMessage(loadingMessage);
  }

  function hideLoadingOverlay() {
    setMessage(undefined);
    setLoading(false);
  }

  const loadingOverlayObject: ILoadingOverlayContext = useMemo(
    () => ({
      loading,
      showLoadingOverlay,
      hideLoadingOverlay,
    }),
    [loading, showLoadingOverlay, hideLoadingOverlay],
  );

  return (
    <LoadingOverlayContext.Provider value={loadingOverlayObject}>
      {loading && <LoadingOverlay visible={loading} text={message} />}
      {children}
    </LoadingOverlayContext.Provider>
  );
}

export default LoadingOverlayProvider;

export const useLoadingOverlay = () => {
  const context = useContext(LoadingOverlayContext);

  if (!context) {
    throw new Error(
      "useLoadingOverlay must be used within LoadingOverlayProvider",
    );
  }

  return context;
};
