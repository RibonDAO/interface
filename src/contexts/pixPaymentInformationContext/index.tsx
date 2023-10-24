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
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import PaymentIntent from "types/entities/PaymentIntent";
import { PaymentIntent as PaymentIntentStripe } from "@stripe/stripe-js";

export interface IPixPaymentInformationContext {
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  buttonDisabled: boolean;
  handleSubmit: () => void;
  clientSecret: string;
  pixInstructions?: PaymentIntent & PaymentIntentStripe;
  verifyPayment: () => void;
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
  const { history, navigateTo } = useNavigation();
  const toast = useToast();
  const { findOrCreateUser } = useUsers();
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { integration } = useIntegration(integrationId);
  const { createSource } = useSources();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
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
        clientSecret,
        {},
        {
          handleActions: false,
        },
      );
      setPixInstructions(
        response?.paymentIntent as PaymentIntent & PaymentIntentStripe,
      );
      if (response?.error) {
        toast({
          message: t("onErrorMessage"),
          type: "info",
        });
      }
      if (response?.paymentIntent?.status === "requires_action") {
        navigateTo({
          pathname: "/promoters/checkout/pix-instructions",
          state: {
            offerId,
            cause,
            nonProfit,
            flow,
          },
        });
      }
    } catch (e) {
      logError(e);
    } finally {
      setButtonDisabled(false);
    }
  };
  const verifyPixPayment = async () => {
    const paymentIntentId = getLocalStorageItem(LAST_CLIENT_SECRET_KEY);

    try {
      await stripe
        ?.confirmPixPayment(
          paymentIntentId ?? "",
          {},
          {
            handleActions: false,
          },
        )
        .then((result) => {
          if (result?.error) {
            toast({
              message: t("onErrorMessage"),
              type: "info",
            });
          }
          if (result?.paymentIntent?.status === "succeeded") {
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
          }
        });
    } catch (e) {
      logError(e);
    }
  };
  useEffect(() => {
    if (clientSecret) {
      setLocalStorageItem(LAST_CLIENT_SECRET_KEY, clientSecret);
    }
  }, [clientSecret, stripe]);
  const showAnimationPixPaymentModal = () => {
    showLoadingOverlay(t("modalAnimationTitle"));
    setTimeout(() => {
      hideLoadingOverlay();
    }, 3000);
  };
  const utmParams = getUTMFromLocationSearch(history.location.search);
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
      utmSource: utmParams.utmSource,
      utmMedium: utmParams.utmMedium,
      utmCampaign: utmParams.utmCampaign,
    };

    setButtonDisabled(true);

    try {
      const response = await pixPaymentApi.postPixPayment(paymentInformation);
      setClientSecret(response.data.clientSecret);
      setTimeout(() => {
        hideLoadingOverlay();
      }, 500);
      generatePixPayment();
    } catch (error) {
      hideLoadingOverlay();
      logError(error);
      toast({
        message: t("onErrorMessage"),
        type: "info",
      });
    }
  };
  const pixPaymentInformationObject: IPixPaymentInformationContext = useMemo(
    () => ({
      handleSubmit,
      buttonDisabled,
      setButtonDisabled,
      clientSecret,
      pixInstructions,
      verifyPayment: verifyPixPayment,
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
