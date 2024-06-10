import RibonLogo from "assets/images/logo-ribon.svg";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-sun-shape.svg";
import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import { useCouponContext } from "contexts/couponContext";
import { useCoupons } from "hooks/useCoupons";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect, useState } from "react";
import useNavigation from "hooks/useNavigation";
import { Coupon } from "@ribon.io/shared/types";
import Loader from "components/atomics/Loader";
import { logEvent } from "lib/events";
import Ticket from "../../donations/GiveTicketPage/assets/ticket.svg";
import * as S from "./styles";

function GiveTicketCouponPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons.giveTicketCouponPage",
  });

  const { setCouponId, couponId } = useCouponContext();
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const { navigateTo } = useNavigation();
  const [couponData, setCouponData] = useState<Coupon | undefined>(undefined);
  const { handleCanCollectByCoupon, handleCollectByCoupon } = useCoupons();

  async function canCollectByCoupon() {
    try {
      const canCollectByCouponData = await handleCanCollectByCoupon();
      setLoading(false);
      if (!canCollectByCouponData.canCollect) {
        navigateTo("/coupons/expired-coupon");
      } else {
        logEvent("P37_view", { couponId });
        setCouponData(canCollectByCouponData.coupon);
      }
    } catch (error) {
      navigateTo("/coupons/expired-coupon");
    }
  }

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      canCollectByCoupon();
    } else {
      navigateTo("/coupons/sign-in");
    }
  }, [currentUser]);

  async function receiveTicket() {
    logEvent("P37_getTicketBtn_click");
    await handleCollectByCoupon({
      onSuccess: () => {
        setCouponId(undefined);
        logEvent("ticketCollected", { from: "coupon" });
        navigateTo("/coupons/coupon-collected");
      },
      onError: () => {
        setCouponId(undefined);
        navigateTo("/coupons/coupon-not-available");
      },
    });
  }

  const numberOfTickets = couponData?.numberOfTickets || 1;

  return loading ? (
    <Loader />
  ) : (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <S.MainContainer>
        <S.Header>
          <S.Logo src={RibonLogo} alt="ribon-logo" />
        </S.Header>
        <S.ContentContainer>
          <S.DefaultImage src={Ticket} />
          <S.TextContainer>
            <S.Title>
              {numberOfTickets > 1
                ? t("titlePlural", { numberOfTickets })
                : t("title")}
            </S.Title>
            <S.Description>
              {couponData?.couponMessage?.rewardText}
            </S.Description>
          </S.TextContainer>
        </S.ContentContainer>
        <S.ButtonContainer>
          <S.FilledButton onClick={() => receiveTicket()}>
            <Icon name="confirmation_number" color={theme.colors.neutral10} />
            {t("buttonText")}
          </S.FilledButton>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default GiveTicketCouponPage;
