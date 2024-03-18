import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { TASKS, useTasks } from "utils/constants/Tasks";
import { useEffect } from "react";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import Tag from "components/atomics/Tag";
import { beginningOfToday } from "lib/dateUtils";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";

function MonthlyTasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const monthlyTasks = useTasks("monthly");
  const { tasksState, tasksStatistics, registerAction } = useTasksContext();
  const { isMobile } = useBreakpoint();

  const showTagNew = () =>
    !(
      new Date(tasksStatistics?.firstCompletedAllTasksAt ?? "") <
      beginningOfToday()
    );

  useEffect(() => {
    const taskContribution = TASKS.filter(
      (task: any) => task.title === "make_contribution",
    )[0];

    const taskStatus = tasksState?.find(
      (task) => task.id === taskContribution.id,
    );
    if (
      tasksStatistics?.contributor &&
      !taskStatus?.done &&
      taskStatus?.timesCompleted === 0
    ) {
      registerAction("contribution_done_page_view");
    }
  }, []);

  return (
    <S.Container isMobile={isMobile}>
      <S.TitleContainer>
        <S.Wrapper>
          <Icon
            name="bolt"
            size="25px"
            color={theme.colors.brand.primary[900]}
          />
          <S.Title>{t("titleSuperTasks")}</S.Title>
        </S.Wrapper>

        {showTagNew() && (
          <Tag
            text={t("new")}
            textColor={theme.colors.brand.primary[900]}
            backgroundColor={theme.colors.brand.primary[50]}
          />
        )}
      </S.TitleContainer>

      {tasksState &&
        monthlyTasks.map((task) =>
          task.isVisible({ state: tasksState }) ? (
            <S.CheckboxContainer key={task.id}>
              <CheckBox
                key={task.id}
                text={t(`tasks.${task?.title}`)}
                sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
                lineThroughOnChecked
                navigationCallback={
                  !tasksState.find((obj) => obj.id === task.id)?.done
                    ? task?.navigationCallback
                    : undefined
                }
                state={
                  !tasksState.find((obj) => obj.id === task.id)?.done
                    ? task?.state
                    : undefined
                }
                disabled
                checked={tasksState.find((obj) => obj.id === task.id)?.done}
              />
            </S.CheckboxContainer>
          ) : null,
        )}
    </S.Container>
  );
}

export default MonthlyTasksSection;
