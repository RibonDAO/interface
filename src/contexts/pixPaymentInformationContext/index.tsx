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
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import { logError } from "services/crashReport";
import GivingIcon from "assets/icons/giving-icon.svg";
import Logo from "assets/icons/logo-background-icon.svg";
import UserIcon from "assets/icons/user.svg";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "lib/localStorage";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { CONTRIBUTION_INLINE_NOTIFICATION } from "pages/donations/CausesPage/ContributionNotification";
import { PLATFORM } from "utils/constants";
import pixPaymentApi from "services/api/pixPaymentApi";
import { useStripe } from "contexts/stripeContext";
import { usePaymentInformation } from "contexts/paymentInformationContext";

export interface IPixPaymentInformationContext {
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  buttonDisabled: boolean;
  handleSubmit: () => void;
  handleConfirmation: () => void;
  clientSecret: string;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const PixPaymentInformationContext =
  createContext<IPixPaymentInformationContext>(
    {} as IPixPaymentInformationContext,
  );

export const CURRENT_COIN_KEY = "CURRENT_COIN_KEY";
const LAST_CLIENT_SECRET_KEY = "LAST_CLIENT_SECRET_KEY";

function PixPaymentInformationProvider({ children }: Props) {
  const { stripe } = useStripe();

  const [clientSecret, setClientSecret] = useState<string>(
    getLocalStorageItem(LAST_CLIENT_SECRET_KEY) || "",
  );

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
    name,
  } = usePaymentInformation();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.pixPaymentInformation",
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
    removeLocalStorageItem(LAST_CLIENT_SECRET_KEY);
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

  const confirmPixPayment = async () => {
    setButtonDisabled(true);
    try {
      const response = await stripe?.confirmPixPayment(clientSecret);
      if (response?.paymentIntent?.status === "succeeded") {
        handleConfirmation();
      }
    } catch (e) {
      logError(e);
    } finally {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (clientSecret) {
      setLocalStorageItem(LAST_CLIENT_SECRET_KEY, clientSecret);
      confirmPixPayment();
    }
  }, [clientSecret, stripe]);

  const showAnimationPixPaymentModal = () => {
    showAnimationModal();
    setTimeout(() => {
      closeAnimationModal();
    }, 3000);
  };

  const handleSubmit = async () => {
    showAnimationPixPaymentModal();

    const paymentInformation = {
      email,
      country,
      state,
      city,
      taxId,
      offerId,
      name,
      integrationId: integrationId ?? 1,
      causeId: cause?.id,
      nonProfitId: nonProfit?.id,
      platform: PLATFORM,
    };

    try {
      const response = await pixPaymentApi.postPixPayment(paymentInformation);
      setClientSecret(response.data.clientSecret);
      closeAnimationModal();
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

  const pixPaymentInformationObject: IPixPaymentInformationContext = useMemo(
    () => ({
      handleSubmit,
      buttonDisabled,
      setButtonDisabled,
      handleConfirmation,
      clientSecret,
    }),
    [buttonDisabled, clientSecret],
  );

  return (
    <PixPaymentInformationContext.Provider value={pixPaymentInformationObject}>
      {children}
    </PixPaymentInformationContext.Provider>
  );
}

export default PixPaymentInformationProvider;

export const usePixPaymentInformation = () => {
  const context = useContext(PixPaymentInformationContext);

  if (!context) {
    throw new Error(
      "usePixPaymentInformation must be used within PixPaymentInformationProvider",
    );
  }

  return context;
};
