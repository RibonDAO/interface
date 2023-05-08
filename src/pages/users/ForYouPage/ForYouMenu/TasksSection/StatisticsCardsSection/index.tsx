import CardTopImage from "components/moleculars/cards/CardTopImage";
import { theme } from "@ribon.io/shared/styles";
import { useTasksContext } from "contexts/tasksContext";
import { useEffect, useState } from "react";
import SunIcon from "./assets/sun-icon.svg";
import BoltIcon from "./assets/bolt-icon.svg";
import EventIcon from "./assets/event-icon.svg";
import * as S from "./styles";

function StatisticsCardsSection() {
  const { tasksState, tasksStatistics } = useTasksContext();
  const [totalDailyTasksCompleted, setTotalDailyTasksCompleted] = useState(0);
  const [totalSuperTasksCompleted, setTotalSuperTasksCompleted] = useState(0);

  const countTotalDailyTasksCompleted = () => {
    const dailyTasksState = tasksState.filter((task) => task.type === "daily");
    if (!dailyTasksState) return 0;
    return dailyTasksState.reduce(
      (total, task) => total + task.timesCompleted,
      0,
    );
  };

  const countTotalSuperTasksCompleted = () => {
    const superTasksState = tasksState.filter(
      (task) => task.type === "monthly",
    );
    if (!superTasksState) return 0;
    return superTasksState.reduce(
      (total, task) => total + task.timesCompleted,
      0,
    );
  };

  useEffect(() => {
    setTotalDailyTasksCompleted(countTotalDailyTasksCompleted());
    setTotalSuperTasksCompleted(countTotalSuperTasksCompleted());
  }, [tasksState]);

  return (
    <S.Container>
      {totalDailyTasksCompleted > 0 && (
        <CardTopImage
          text="daily tasks completed"
          icon={SunIcon}
          title={totalDailyTasksCompleted.toString()}
          size="small"
        />
      )}
      <CardTopImage
        text="super tasks completed"
        icon={BoltIcon}
        title={totalSuperTasksCompleted.toString()}
        size="small"
        textColor={theme.colors.brand.tertiary[900]}
        titleColor={theme.colors.brand.tertiary[900]}
      />
      <CardTopImage
        text="days in a row completing tasks"
        icon={EventIcon}
        title={tasksStatistics?.streak?.toString() ?? "0"}
        size="small"
        textColor={theme.colors.brand.secondary[800]}
        titleColor={theme.colors.brand.secondary[800]}
      />
    </S.Container>
  );
}

export default StatisticsCardsSection;
