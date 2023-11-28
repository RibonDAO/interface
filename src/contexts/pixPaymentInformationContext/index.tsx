import { useCurrentUser } from "contexts/currentUserContext";
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
import { logError } from "services/crashReport";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { useIntegration, useSources, useUsers } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { CONTRIBUTION_INLINE_NOTIFICATION } from "pages/donations/CausesPage/ContributionNotification";
import { PLATFORM } from "utils/constants";
import pixPaymentApi from "services/api/pixPaymentApi";
import { useStripe } from "contexts/stripeContext";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import PaymentIntent from "types/entities/PaymentIntent";
import { PaymentIntent as PaymentIntentStripe } from "@stripe/stripe-js";

export interface IPixPaymentInformationContext {
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  buttonDisabled: boolean;
  handleSubmit: () => void;
  clientSecret?: string;
  verifyPixPayment: (secret: string, intervalId: string) => void;
  pixInstructions?: PaymentIntent & PaymentIntentStripe;
}
export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const PixPaymentInformationContext =
  createContext<IPixPaymentInformationContext>(
    {} as IPixPaymentInformationContext,
  );
const LAST_CLIENT_SECRET_KEY = "LAST_CLIENT_SECRET_KEY";
function PixPaymentInformationProvider({ children }: Props) {
  const { stripe } = useStripe();
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
    from,
  } = usePaymentInformation();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.pixPaymentInformation",
  });
  const { history, navigateTo } = useNavigation();
  const toast = useToast();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { integration } = useIntegration(integrationId);
  const { createSource } = useSources();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  const [clientSecret, setClientSecret] = useState<string>();
  const [pixInstructions, setPixInstructions] = useState<
    PaymentIntent & PaymentIntentStripe
  >();

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
  const generatePixPayment = async () => {
    try {
      const response = await stripe?.confirmPixPayment(
        clientSecret ?? "",
        {},
        { handleActions: false },
      );
      setPixInstructions(
        response?.paymentIntent as PaymentIntent & PaymentIntentStripe,
      );
      setTimeout(() => {
        hideLoadingOverlay();
      }, 500);
    } catch (e) {
      logError(e);
      toast({
        message: t("onErrorMessage"),
        type: "info",
      });
    } finally {
      setButtonDisabled(false);
    }
  };

  const verifyPixPayment = async (secret: string, intervalId: string) => {
    try {
      const response = await stripe?.retrievePaymentIntent(secret ?? "");

      if (response?.paymentIntent?.status === "succeeded") {
        setLocalStorageItem(CONTRIBUTION_INLINE_NOTIFICATION, "3");
        removeLocalStorageItem(LAST_CLIENT_SECRET_KEY);

        clearInterval(intervalId);
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
      }
    } catch (e) {
      logError(e);
      toast({
        message: t("onErrorMessage"),
        type: "info",
      });
    }
  };

  const showAnimationPixPaymentModal = () => {
    showLoadingOverlay(t("modalAnimationTitle"));
    setTimeout(() => {
      hideLoadingOverlay();
    }, 3000);
  };

  const utmParams = getUTMFromLocationSearch(history.location.search);

  useEffect(() => {
    if (clientSecret) {
      setLocalStorageItem(LAST_CLIENT_SECRET_KEY, clientSecret);
      generatePixPayment();
    }
  }, [clientSecret]);

  useEffect(() => {
    if (pixInstructions) {
      if (pixInstructions.status === "requires_action") {
        navigateTo({
          pathname: "/promoters/checkout/pix-instructions",
          state: {
            offerId,
            cause,
            nonProfit,
            flow,
            pixInstructions,
          },
        });
      }
    }
  }, [pixInstructions]);

  const handleSubmit = async () => {
    setButtonDisabled(true);
    removeLocalStorageItem(LAST_CLIENT_SECRET_KEY);
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
      utmSource: utmParams.utmSource,
      utmMedium: utmParams.utmMedium,
      utmCampaign: utmParams.utmCampaign,
    };

    try {
      const response = await pixPaymentApi.postPixPayment(paymentInformation);
      setClientSecret(response.data.clientSecret ?? "");
      login();
      showLoadingOverlay(t("modalAnimationTitle"));
    } catch (error) {
      hideLoadingOverlay();
      logError(error);
      toast({
        message: t("onErrorMessage"),
        type: "info",
      });
    } finally {
      setButtonDisabled(false);
    }
  };
  const pixPaymentInformationObject: IPixPaymentInformationContext = useMemo(
    () => ({
      handleSubmit,
      buttonDisabled,
      setButtonDisabled,
      clientSecret,
      verifyPixPayment,
      pixInstructions,
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
