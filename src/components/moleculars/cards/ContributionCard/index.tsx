import { formatPrice } from "lib/formatters/currencyFormatter";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

export type Props = {
  description: string;
  title: string;
  value: number;
  onClick: () => void;
  style?: React.CSSProperties;
};

function ContributionCard({
  description,
  title,
  onClick,
  value,
  style,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });
  return (
    <S.Container style={style}>
      <S.Title>{title}</S.Title>
      <S.Value>{formatPrice(value, "brl")}</S.Value>
      <S.Description>{description}</S.Description>
      <S.DonationButton onClick={() => onClick()} text={t("button")} />
    </S.Container>
  );
}

export default ContributionCard;
