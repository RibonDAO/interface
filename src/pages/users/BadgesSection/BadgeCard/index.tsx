import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useState } from "react";
import { logEvent } from "lib/events";
import * as S from "../styles";

type Props = {
  badge: any;
};
function BadgeCard({ badge }: Props): JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ModalDialog
        description={badge.description}
        title={badge.name}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <S.BadgeContainer
        achieved={badge.achieved}
        onClick={() => {
          logEvent("badgeCard_click", {
            badgeId: badge?.id,
          });
          setVisible(true);
        }}
      >
        <S.BadgeImage src={badge.image} alt={badge.name} />
      </S.BadgeContainer>
    </>
  );
}
export default BadgeCard;
