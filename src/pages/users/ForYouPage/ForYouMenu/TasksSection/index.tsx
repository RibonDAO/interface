import CheckBox from "components/atomics/inputs/Checkbox";
import { useTasksContext } from "contexts/tasksContext";
import { useTranslation } from "react-i18next";
import { useTasks } from "utils/constants/Tasks";
import { useCallback, useEffect } from "react";
import theme from "styles/theme";
import Icon from "components/atomics/Icon";
import ProgressBar from "components/atomics/ProgressBar";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import * as S from "./styles";

function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "forYouPage.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  const { tasksState, setHasCompletedATask } = useTasksContext();

  const tasksCount = useCallback(() => {
    if (!tasksState) return;
    if (!tasksState.length) return;

    const filterVisible = dailyTasks.filter((task: any) =>
      task.isVisible({ state: tasksState }),
    );

    // eslint-disable-next-line consistent-return
    return filterVisible.length;
  }, [tasksState]);

  useEffect(() => {
    setHasCompletedATask(false);
  }, []);

  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  const integrationId = useIntegrationId();

  const { integration } = useIntegration(integrationId);

  const progressBarValue = tasksState
    ? tasksState.filter((obj) => obj.done === true).length
    : 0;

  return (
    <S.Container>
      <S.ProgressBar>
        <ProgressBar
          value={progressBarValue}
          min={0}
          max={tasksCount() || dailyTasks.length}
        />
      </S.ProgressBar>
      <S.TitleContainer>
        <Icon
          name="light_mode"
          size="25px"
          color={theme.colors.brand.primary[900]}
        />
        <S.Title>{t("title")}</S.Title>
      </S.TitleContainer>
      {tasksState &&
        dailyTasks.map((task) => (
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
              disabled
              checked={tasksState.find((obj) => obj.id === task.id)?.done}
            />
          </S.CheckboxContainer>
        ))}
      {integration?.integrationTask &&
        tasksState.find((obj) => obj.id === donateTicketTask?.id)?.done && (
          <S.IntegrationContainer>
            <S.RightContainer>
              <S.Image src={integration?.logo} alt="logo" />
            </S.RightContainer>
            <S.LeftContainer>
              <S.IntegrationTitle>
                {integration?.integrationTask.description}
              </S.IntegrationTitle>
              <S.Link
                href={integration?.integrationTask.linkAddress}
                target="_blank"
                rel="noreferrer"
              >
                {integration?.integrationTask.link}
              </S.Link>
            </S.LeftContainer>
          </S.IntegrationContainer>
        )}
    </S.Container>
  );
}

export default TasksSection;
