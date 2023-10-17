import { useCountdown } from "hooks/useCountdown";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { nextDay } from "lib/dateUtils";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

function CountdownSection() {
  const { tasksState, reload } = useTasksContext();
  const countdown = useCountdown(nextDay(), reload);

  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  if (!tasksState) return null;
  if (!tasksState.length) return null;
  if (
    tasksState.filter((obj) => obj.done === false && obj.type === "daily")
      .length
  )
    return null;
  if (countdown.reduce((a, b) => a + b, 0) <= 0) return null;

  return (
    <S.TimerWrapper>
      <S.Countdown>{formatCountdown(countdown)}</S.Countdown>
      <p>{t("countdown")}</p>
    </S.TimerWrapper>
  );
}

export default CountdownSection;
