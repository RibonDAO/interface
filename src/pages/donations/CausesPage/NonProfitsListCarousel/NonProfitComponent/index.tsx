import { NonProfit } from "@ribon.io/shared";
import * as S from "./styles";

function NonProfitComponent({ nonProfit }: { nonProfit: NonProfit }) {
  return (
    <S.Container>
      <br/>
      <p>
        {nonProfit.name}
      </p>
    </S.Container>
  );
}

export default NonProfitComponent;