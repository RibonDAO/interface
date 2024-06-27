import { useTasksContext } from "contexts/tasksContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { useTasks } from "utils/constants/Tasks";
import Avatar from "assets/images/avatar.svg";
import * as S from "./styles";

function IntegrationTasksSection() {
  const { integration } = useIntegrationContext();

  const dailyTasks = useTasks("daily");
  const { tasksState } = useTasksContext();
  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  return (
    <S.Container>
      {integration?.integrationTask &&
        tasksState.find((obj) => obj.id === donateTicketTask?.id)?.done && (
          <S.IntegrationContainer>
            <S.RightContainer>
              <S.Image src={integration?.logo || Avatar} alt="logo" />
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

export default IntegrationTasksSection;
