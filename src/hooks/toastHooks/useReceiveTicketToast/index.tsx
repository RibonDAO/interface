import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useToast from "hooks/useToast";
import useBreakpoint from "hooks/useBreakpoint";
import { theme } from "@ribon.io/shared/styles";
import { Integration } from "@ribon.io/shared/types";
import { newLogEvent } from "lib/events";

export function useReceiveTicketToast(
  initialState?: boolean,
  integration?: Integration,
) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const toast = useToast();
  const { isMobile } = useBreakpoint();

  const showReceiveTicketToast = () => {
    toast({
      type: "custom",
      message: t("ticketToast"),
      position: isMobile ? "bottom" : "top-right",
      navigate: "/tickets",
      icon: "confirmation_number",
      backgroundColor: theme.colors.brand.primary[50],
      iconColor: theme.colors.brand.primary[600],
      borderColor: theme.colors.brand.primary[600],
      textColor: theme.colors.brand.primary[600],
    });
    newLogEvent("view", "receiveTicket", { from: "receivedTickets_toast" });
  };

  useEffect(() => {
    if (initialState && integration) showReceiveTicketToast();
  }, []);

  return { showReceiveTicketToast };
}
