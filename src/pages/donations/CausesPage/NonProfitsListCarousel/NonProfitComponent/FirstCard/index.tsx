import { NonProfit } from "@ribon.io/shared/types";
import Button from "components/atomics/buttons/Button";
import TicketIconText from "components/moleculars/TicketIconText";
import theme from "styles/theme";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  buttonOnClick: () => void;
  buttonText: string;
  buttonDisabled: boolean;
  ticketsQuantity: number;
};

export default function FirstCard({
  nonProfit,
  buttonOnClick,
  buttonText,
  buttonDisabled,
  ticketsQuantity,
}: Props) {
  
  return (
    <S.Container image={nonProfit.coverImage}>
      <S.NgoName>{nonProfit.name}</S.NgoName>
      <S.ImpactTitle>{nonProfit.impactTitle}</S.ImpactTitle>
      <S.TicketsContainer>
        <TicketIconText quantity={ticketsQuantity} buttonDisabled />
      </S.TicketsContainer>
      <S.ButtonContainer>
        <Button
          text={buttonText}
          onClick={buttonOnClick}
          disabled={buttonDisabled}
          backgroundColor={theme.colors.brand.primary[600]}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
