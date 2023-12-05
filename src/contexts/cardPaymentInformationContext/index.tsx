import { useCurrentUser } from "contexts/currentUserContext";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import useNavigation from "hooks/useNavigation";
import useToast from "hooks/useToast";
import {
  createContext,
  useContext,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import creditCardPaymentApi from "services/api/creditCardPaymentApi";
import GivingIcon from "assets/icons/giving-icon.svg";
import Logo from "assets/icons/logo-background-icon.svg";
import UserIcon from "assets/icons/user.svg";
import { setLocalStorageItem } from "lib/localStorage";
import {
  useIntegration,
  useSources,
  useUserProfile,
  useUsers,
} from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { CONTRIBUTION_INLINE_NOTIFICATION } from "pages/donations/CausesPage/ContributionNotification";
import { PLATFORM } from "utils/constants";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";

export interface ICardPaymentInformationContext {
  setNumber: (value: SetStateAction<string>) => void;
  setName: (value: SetStateAction<string>) => void;
  setExpirationDate: (value: SetStateAction<string>) => void;
  setCvv: (value: SetStateAction<string>) => void;
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  buttonDisabled: boolean;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
  handleSubmit: (platform: string) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CardPaymentInformationContext =
  createContext<ICardPaymentInformationContext>(
    {} as ICardPaymentInformationContext,
  );

function CardPaymentInformationProvider({ children }: Props) {
  const {
    integrationId,
    flow,
    country,
    state,
    city,
    taxId,
    offerId,
    cause,
    nonProfit,
    email,
    from,
  } = usePaymentInformation();
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.cardPaymentInformation",
  });

  const { history, navigateTo } = useNavigation();

  const toast = useToast();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { integration } = useIntegration(integrationId);
  const { createSource } = useSources();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();

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
      pathname: "/contribution-done",
      state: {
        hasButton: true,
        offerId,
        cause,
        nonProfit,
        flow,
        from,
      },
    });
  };

  const { show: showAnimationModal, hide: closeAnimationModal } = useModal({
    type: MODAL_TYPES.MODAL_ANIMATION,
    props: {
      text: t("modalAnimationTitle"),
      iconOrigin: profile?.photo ?? UserIcon,
      textOrigin: t("modalAnimationFrom"),
      iconDestiny: Logo,
      textDestiny: t("modalAnimationTo"),
      icon: GivingIcon,
      isIconOriginFullSize: !!profile?.photo,
    },
  });

  const showAnimationCreditCardPaymentModal = () => {
    showAnimationModal();
    setTimeout(() => {
      closeAnimationModal();
    }, 3000);
  };

  const utmParams = getUTMFromLocationSearch(history.location.search);

  const handleSubmit = async (platform: string) => {
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
      utmSource: utmParams.utmSource,
      utmMedium: utmParams.utmMedium,
      utmCampaign: utmParams.utmCampaign,
    };

    try {
      await creditCardPaymentApi.postCreditCardPayment(paymentInformation);
      closeAnimationModal();
      handleConfirmation();
    } catch (error) {
      closeAnimationModal();
      logError(error);
      toast({
        message: t("onErrorMessage"),
        type: "info",
      });
    }
  };

  const cardPaymentInformationObject: ICardPaymentInformationContext = useMemo(
    () => ({
      handleSubmit,
      setName,
      name,
      setNumber,
      number,
      setExpirationDate,
      expirationDate,
      setCvv,
      cvv,
      buttonDisabled,
      setButtonDisabled,
    }),
    [number, name, expirationDate, cvv, buttonDisabled],
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
