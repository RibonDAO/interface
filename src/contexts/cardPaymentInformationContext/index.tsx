import { useCurrentUser } from "contexts/currentUserContext";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import useNavigation from "hooks/useNavigation";
import useToast from "hooks/useToast";
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
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import { logError } from "services/crashReport";
import { Currencies, Cause, NonProfit } from "@ribon.io/shared/types";
import creditCardPaymentApi from "services/api/creditCardPaymentApi";
import GivingIcon from "assets/icons/giving-icon.svg";
import Logo from "assets/icons/logo-background-icon.svg";
import UserIcon from "assets/icons/user.svg";
import { useIntegrationId } from "hooks/useIntegrationId";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { CONTRIBUTION_INLINE_NOTIFICATION } from "pages/donations/CausesPage/ContributionNotification";
import { PLATFORM } from "utils/constants";

export interface ICardPaymentInformationContext {
  setCurrentCoin: (value: SetStateAction<Currencies>) => void;
  setCountry: (value: SetStateAction<string>) => void;
  setState: (value: SetStateAction<string>) => void;
  setCity: (value: SetStateAction<string>) => void;
  setTaxId: (value: SetStateAction<string>) => void;
  setEmail: (value: SetStateAction<string>) => void;
  setNumber: (value: SetStateAction<string>) => void;
  setName: (value: SetStateAction<string>) => void;
  setExpirationDate: (value: SetStateAction<string>) => void;
  setCvv: (value: SetStateAction<string>) => void;
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  setCryptoGiving: (value: SetStateAction<string>) => void;
  setOfferId: (value: SetStateAction<number>) => void;
  setFlow: (value: SetStateAction<"cause" | "nonProfit">) => void;
  buttonDisabled: boolean;
  currentCoin: Currencies;
  country: string;
  state: string;
  city: string;
  taxId: string;
  email: string;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
  cryptoGiving: string;
  offerId: number;
  flow: "cause" | "nonProfit";
  handleSubmit: (platform: string) => void;
  cause: Cause | undefined;
  setCause: (value: SetStateAction<Cause | undefined>) => void;
  nonProfit: NonProfit | undefined;
  setNonProfit: (value: SetStateAction<NonProfit | undefined>) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CardPaymentInformationContext =
  createContext<ICardPaymentInformationContext>(
    {} as ICardPaymentInformationContext,
  );

export const CURRENT_COIN_KEY = "CURRENT_COIN_KEY";

function CardPaymentInformationProvider({ children }: Props) {
  const { currentUser } = useCurrentUser();
  const { currentLang } = useLanguage();

  const defaultCoin = () =>
    (getLocalStorageItem(CURRENT_COIN_KEY) as Currencies) ||
    coinByLanguage(currentLang);

  const [currentCoin, setCurrentCoin] = useState<Currencies>(defaultCoin());

  useEffect(() => {
    setLocalStorageItem(CURRENT_COIN_KEY, currentCoin);
  }, [currentCoin]);

  const integrationId = useIntegrationId();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cryptoGiving, setCryptoGiving] = useState("");
  const [offerId, setOfferId] = useState(1);
  const [cause, setCause] = useState<Cause>();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const [flow, setFlow] = useState<"nonProfit" | "cause">("nonProfit");

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.cardPaymentInformation",
  });

  const { navigateTo } = useNavigation();

  const toast = useToast();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { integration } = useIntegration(integrationId);
  const { createSource } = useSources();

  const login = async () => {
    if (!signedIn) {
      try {
        const user = await findOrCreateUser(email, normalizedLanguage());
        if (integration) {
          createSource(user.id, integration.id);
        }
        setCurrentUser(user);
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleConfirmation = async () => {
    setLocalStorageItem(CONTRIBUTION_INLINE_NOTIFICATION, "3");
    login();
    navigateTo({
      pathname: "/donation-done-cause",
      state: {
        hasButton: true,
        offerId,
        cause,
        nonProfit,
        flow,
      },
    });
  };

  const { show: showAnimationModal, hide: closeAnimationModal } = useModal({
    type: MODAL_TYPES.MODAL_ANIMATION,
    props: {
      text: t("modalAnimationTitle"),
      iconOrigin: UserIcon,
      textOrigin: t("modalAnimationFrom"),
      iconDestiny: Logo,
      textDestiny: t("modalAnimationTo"),
      icon: GivingIcon,
    },
  });

  const showAnimationCreditCardPaymentModal = () => {
    showAnimationModal();
    setTimeout(() => {
      closeAnimationModal();
    }, 3000);
  };

  const handleSubmit = async (platform: string) => {
    logEvent("treasureSupportConfirmBtn_click");
    showAnimationCreditCardPaymentModal();

    const expiration = expirationDate.split("/");

    const paymentInformation = {
      email,
      country,
      state,
      city,
      taxId,
      offerId,
      integrationId: integrationId ?? 1,
      card: {
        number: number.replace(/\D/g, ""),
        name,
        expirationMonth: expiration[0],
        expirationYear: expiration[1].slice(-2),
        cvv,
      },
      causeId: cause?.id,
      nonProfitId: nonProfit?.id,
      platform: platform || PLATFORM,
    };

    try {
      await creditCardPaymentApi.postCreditCardPayment(paymentInformation);
      closeAnimationModal();
      handleConfirmation();
      logEvent("treasureGivingConfirmMdl_view");
    } catch (error) {
      closeAnimationModal();
      logError(error);
      toast({
        message: t("onErrorMessage"),
        type: "info",
      });

      logEvent("toastNotification_view", {
        status: "transactionFailed",
      });
    }
  };

  const cardPaymentInformationObject: ICardPaymentInformationContext = useMemo(
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
      handleSubmit,
      setName,
      name,
      setNumber,
      number,
      setEmail,
      email,
      setExpirationDate,
      expirationDate,
      setCvv,
      cvv,
      buttonDisabled,
      setButtonDisabled,
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
    }),
    [
      currentCoin,
      offerId,
      country,
      city,
      state,
      taxId,
      email,
      number,
      name,
      expirationDate,
      cvv,
      buttonDisabled,
      cause,
      nonProfit,
      flow,
    ],
  );

  return (
    <CardPaymentInformationContext.Provider
      value={cardPaymentInformationObject}
    >
      {children}
    </CardPaymentInformationContext.Provider>
  );
}

export default CardPaymentInformationProvider;

export const useCardPaymentInformation = () => {
  const context = useContext(CardPaymentInformationContext);

  if (!context) {
    throw new Error(
      "useCardPaymentInformation must be used within CardPaymentInformationProvider",
    );
  }

  return context;
};
