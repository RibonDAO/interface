import { useIntegration } from "@ribon.io/shared/hooks";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Integration } from "@ribon.io/shared/types";
import { RIBON_COMPANY_ID } from "utils/constants";
import { useIntegrationId } from "hooks/useIntegrationId";
import extractUrlValue from "lib/extractUrlValue";
import useNavigation from "hooks/useNavigation";

export interface IIntegrationContext {
  integration?: Integration;
  currentIntegrationId: string | number;
  setCurrentIntegrationId: (id: SetStateAction<string | number>) => void;
  externalIds: string[] | undefined;
  setExternalIds: (id: SetStateAction<string[] | undefined>) => void;
  refetch: () => void;
  ticketsFromIntegration: number;
  setTicketsFromIntegration: (tickets: SetStateAction<number>) => void;
}

export const IntegrationContext = createContext<IIntegrationContext>(
  {} as IIntegrationContext,
);

function IntegrationProvider({ children }: any) {
  const [currentIntegrationId, setCurrentIntegrationId] = useState<
    string | number
  >(RIBON_COMPANY_ID);
  const [externalIds, setExternalIds] = useState<string[]>();
  const [ticketsFromIntegration, setTicketsFromIntegration] =
    useState<number>(1);
  const integrationId = useIntegrationId();
  const { integration, refetch } = useIntegration(currentIntegrationId);
  const { history } = useNavigation();
  const externalIdFromUrl = extractUrlValue(
    "external_id",
    history.location.search,
  );
  // eslint-disable-next-line no-nested-ternary
  const externalIdsArray = externalIdFromUrl
    ? decodeURIComponent(externalIdFromUrl).includes(",")
      ? decodeURIComponent(externalIdFromUrl).split(",")
      : decodeURIComponent(externalIdFromUrl).split("%2C")
    : [];

  useEffect(() => {
    if (integrationId) {
      setCurrentIntegrationId(integrationId);
    }
  }, [integrationId]);

  useEffect(() => {
    if (externalIdsArray && externalIdsArray.length > 0) {
      setExternalIds(externalIdsArray);
      setTicketsFromIntegration(externalIdsArray.length);
    } else {
      setTicketsFromIntegration(1);
    }
  }, []);

  useEffect(() => {
    if (currentIntegrationId) {
      refetch();
    }
  }, [currentIntegrationId]);

  const IntegrationObject: IIntegrationContext = useMemo(
    () => ({
      integration,
      refetch,
      externalIds,
      currentIntegrationId,
      setCurrentIntegrationId,
      setExternalIds,
      ticketsFromIntegration,
      setTicketsFromIntegration,
    }),
    [integration, currentIntegrationId, externalIds, ticketsFromIntegration],
  );

  return (
    <IntegrationContext.Provider value={IntegrationObject}>
      {children}
    </IntegrationContext.Provider>
  );
}

export default IntegrationProvider;

export function useIntegrationContext() {
  const context = useContext(IntegrationContext);

  if (!context) {
    throw new Error(
      "useIntegrationContext must be used within a IntegrationProvider",
    );
  }

  return context;
}
