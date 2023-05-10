import CardTopImage from "components/moleculars/cards/CardTopImage";
import { theme } from "@ribon.io/shared/styles";
import { useTasksContext } from "contexts/tasksContext";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTasksStatistics } from "@ribon.io/shared/hooks";
import SunIcon from "./assets/sun-icon.svg";
import BoltIcon from "./assets/bolt-icon.svg";
import EventIcon from "./assets/event-icon.svg";
import * as S from "./styles";

function StatisticsCardsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection.cardsStatisticsSection",
  });
  const { tasksState, tasksStatistics, reload } = useTasksContext();
  const { refetchTasksStatistics } = useTasksStatistics();
  const [dailyTasksCompleted, setDailyTasksCompleted] = useState(0);
  const [superTasksCompleted, setSuperTasksCompleted] = useState(0);

  const countDailyTasksCompleted = () => {
    const dailyTasksState = tasksState.filter((task) => task.type === "daily");
    if (!dailyTasksState) return 0;
    return dailyTasksState.reduce(
      (total, task) => total + task.timesCompleted,
      0,
    );
  };

  const countSuperTasksCompleted = () => {
    const superTasksState = tasksState.filter(
      (task) => task.type === "monthly",
    );
    if (!superTasksState) return 0;
    return superTasksState.reduce(
      (total, task) => total + task.timesCompleted,
      0,
    );
  };

  const showMonthlyTasks = useCallback(() => {
    if (!tasksStatistics) return false;
    if (tasksStatistics.contributor) return true;
    if (tasksStatistics.firstCompletedAllTasksAt) return true;

    return false;
  }, [tasksState, tasksStatistics]);

  useEffect(() => {
    setDailyTasksCompleted(countDailyTasksCompleted());
    setSuperTasksCompleted(countSuperTasksCompleted());
  }, [tasksState]);

  useEffect(() => {
    refetchTasksStatistics();
  }, [tasksStatistics, refetchTasksStatistics]);

  useEffect(() => {
    reload();
  }, []);

  return (
    <S.CardsButtonContainer>
      {dailyTasksCompleted > 0 && (
        <CardTopImage
          text={t("dailyTasksTitle")}
          icon={SunIcon}
          title={dailyTasksCompleted.toString() ?? "0"}
          size="small"
          biggerContainer
        />
      )}
      {showMonthlyTasks() && (
        <CardTopImage
          text={t("superTasksTitle")}
          icon={BoltIcon}
          title={superTasksCompleted.toString() ?? "0"}
          size="small"
          biggerContainer
          color={theme.colors.brand.tertiary[900]}
        />
      )}
      {dailyTasksCompleted > 0 && (
        <CardTopImage
          text={t("streakTitle")}
          icon={EventIcon}
          title={tasksStatistics?.streak?.toString() ?? "0"}
          size="small"
          biggerContainer
          color={theme.colors.brand.secondary[800]}
        />
      )}
    </S.CardsButtonContainer>
  );
}

export default StatisticsCardsSection;
