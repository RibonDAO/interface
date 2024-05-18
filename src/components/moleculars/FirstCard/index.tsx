import React from "react";
import { NonProfit } from "@ribon.io/shared/types";
import Button from "components/atomics/buttons/Button";
import TicketIconText from "components/moleculars/TicketIconText";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  buttonOnClick: () => void;
  buttonDisabled: boolean;
  ticketsQuantity: number;
};

export default function FirstCard({
  nonProfit,
  buttonOnClick,
  buttonDisabled,
  ticketsQuantity,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.firstCard",
  });
  return (
    <S.Container image={nonProfit.backgroundImage}>
      <S.NgoName>{nonProfit.name}</S.NgoName>
      <S.ImpactTitle>aaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaa</S.ImpactTitle>
      <S.TicketsContainer>
        <TicketIconText quantity={ticketsQuantity} buttonDisabled />
      </S.TicketsContainer>
      <S.ButtonContainer>
        <Button
          text={t("textButton")}
          onClick={buttonOnClick}
          disabled={buttonDisabled}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
