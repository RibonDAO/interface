import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "hooks/useLanguage";
import { coinByLanguage } from "lib/coinByLanguage";
import {
  createContext,
  useContext,
  SetStateAction,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Currencies, Cause, NonProfit } from "@ribon.io/shared/types";
import { useIntegrationContext } from "contexts/integrationContext";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import useLocalStorageState from "hooks/useLocalStorageState";
import { useTranslation } from "react-i18next";

export interface IPaymentInformationContext {
  setCurrentCoin: (value: SetStateAction<Currencies>) => void;
  setCountry: (value: SetStateAction<string>) => void;
  setState: (value: SetStateAction<string>) => void;
  setCity: (value: SetStateAction<string>) => void;
  setTaxId: (value: SetStateAction<string>) => void;
  setEmail: (value: SetStateAction<string>) => void;
  setCryptoGiving: (value: SetStateAction<string>) => void;
  setOfferId: (value: SetStateAction<number>) => void;
  setFlow: (value: SetStateAction<"cause" | "nonProfit">) => void;
  setFrom: (value: SetStateAction<string>) => void;
  currentCoin: Currencies;
  country: string;
  state: string;
  city: string;
  taxId: string;
  email: string;
  name: string;
  setName: (value: SetStateAction<string>) => void;
  cryptoGiving: string;
  offerId: number;
  cause: Cause | undefined;
  setCause: (value: SetStateAction<Cause | undefined>) => void;
  nonProfit: NonProfit | undefined;
  setNonProfit: (value: SetStateAction<NonProfit | undefined>) => void;
  integrationId: string | number | null;
  flow: "cause" | "nonProfit";
  from: string;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const PaymentInformationContext =
  createContext<IPaymentInformationContext>({} as IPaymentInformationContext);

export const CURRENT_COIN_KEY = "CURRENT_COIN_KEY";

function PaymentInformationProvider({ children }: Props) {
  const { currentUser } = useCurrentUser();
  const { currentLang } = useLanguage();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const defaultCoin = () =>
    (getLocalStorageItem(CURRENT_COIN_KEY) as Currencies) ||
    coinByLanguage(currentLang);

  const [currentCoin, setCurrentCoin] = useState<Currencies>(defaultCoin());

  useEffect(() => {
    setLocalStorageItem(CURRENT_COIN_KEY, currentCoin);
  }, [currentCoin]);

  const { currentIntegrationId: integrationId } = useIntegrationContext();

  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [cryptoGiving, setCryptoGiving] = useState("");
  const [offerId, setOfferId] = useState(1);
  const [cause, setCause] = useState<Cause>();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const [flow, setFlow] = useState<"nonProfit" | "cause">("nonProfit");
  const [country, setCountry] = useLocalStorageState(
    "COUNTRY",
    t("brazilName"),
  );
  const [state, setState] = useLocalStorageState("STATE", "");
  const [city, setCity] = useLocalStorageState("CITY", "");
  const [name, setName] = useLocalStorageState("NAME", "");
  const [from, setFrom] = useState("");

  const paymentInformationObject: IPaymentInformationContext = useMemo(
    () => ({
      currentCoin,
      setCurrentCoin,
      country,
      setCountry,
      city,
      setCity,
      state,
      setState,
      taxId,
      setTaxId,
      setName,
      name,
      setEmail,
      email,
      setCryptoGiving,
      cryptoGiving,
      setOfferId,
      offerId,
      cause,
      setCause,
      nonProfit,
      setNonProfit,
      flow,
      setFlow,
      integrationId,
      from,
      setFrom,
    }),
    [
      currentCoin,
      offerId,
      country,
      city,
      state,
      taxId,
      email,
      name,
      cause,
      nonProfit,
      flow,
      integrationId,
      from,
    ],
  );

  return (
    <PaymentInformationContext.Provider value={paymentInformationObject}>
      {children}
    </PaymentInformationContext.Provider>
  );
}

export default PaymentInformationProvider;

export const usePaymentInformation = () => {
  const context = useContext(PaymentInformationContext);

  if (!context) {
    throw new Error(
      "usePaymentInformation must be used within PaymentInformationProvider",
    );
  }

  return context;
};
