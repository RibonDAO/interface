import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TASKS } from "utils/constants/Tasks";
import {
  beginningOfThisMonth,
  beginningOfToday,
  nextDay,
  nextMonth,
} from "lib/dateUtils";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useCanDonate,
  useCompletedTasks,
  useTasksStatistics,
} from "@ribon.io/shared/hooks";
import { CompletedTask } from "@ribon.io/shared/types/apiResponses";
import { theme } from "@ribon.io/shared/styles";
import useToast from "hooks/useToast";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import extractUrlValue from "lib/extractUrlValue";
import { useIntegrationId } from "hooks/useIntegrationId";
import { PLATFORM } from "utils/constants";
import { useLocation } from "react-router-dom";
import TasksStatistics from "@ribon.io/shared/types/apiResponses/TasksStatistics";

export type TaskStateItem = {
  id: string;
  nextAction: string;
  done: boolean;
  type: string;
  expiresAt: string;
  timesCompleted: number;
};

export interface ITasksContext {
  hasCompletedATask: boolean;
  setHasCompletedATask: (value: boolean) => void;
  tasksState: TaskStateItem[];
  registerAction: (action: string) => void;
  reload: () => void;
  tasksStatistics?: TasksStatistics;
}

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

function TasksProvider({ children }: any) {
  const [tasksState, setTasksState] = useState<any[]>([]);
  const [hasCompletedATask, setHasCompletedATask] = useState(false);
  const { findCompletedTasks, completeTask } = useCompletedTasks();
  const {
    tasksStatistics,
    completeAllTasks,
    updateStreak,
    refetchTasksStatistics,
  } = useTasksStatistics();
  const { currentUser, signedIn } = useCurrentUser();
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.tasksContext",
  });
  const integrationId = useIntegrationId();
  const { search } = useLocation();
  const externalId = extractUrlValue("external_id", search);
  const { donateApp } = useCanDonate(integrationId, PLATFORM, externalId);

  const toast = useToast();

  const { isMobile } = useBreakpoint();

  const isDone = (task: CompletedTask | undefined) => {
    if (!task) return false;
    const lastCompletedAt = new Date(task.lastCompletedAt);
    const taskObject = TASKS.find(
      (filterTask) => filterTask.id === task.taskIdentifier,
    );

    const baseDate =
      taskObject?.type === "daily"
        ? beginningOfToday()
        : beginningOfThisMonth();

    if (baseDate > lastCompletedAt) return false;

    return true;
  };

  function allDone(tasks: any) {
    const dailyTasks = tasks.filter((task: any) => task.type === "daily");
    return dailyTasks.every((task: any) => task.done === true);
  }
  const isExpired = (task: CompletedTask | undefined) => {
    if (!task) return false;

    const taskObject = TASKS.find(
      (filterTask) => filterTask.id === task.taskIdentifier,
    );

    if (isDone(task)) {
      return taskObject?.type === "daily" ? nextDay() : nextMonth();
    } else {
      return null;
    }
  };

  const buildTasksState = () => {
    findCompletedTasks().then((completedTasks) => {
      const state = TASKS.map((task) => {
        const currentTask = completedTasks.find(
          (filterTask) => filterTask.taskIdentifier === task.id,
        );

        return {
          id: task.id,
          nextAction: task.actions[0],
          type: task.type,
          timesCompleted: currentTask?.timesCompleted || 0,
          done: isDone(currentTask),
          expiresAt: isExpired(currentTask),
          lastCompletedAt: currentTask?.lastCompletedAt,
        };
      });
      setTasksState(state);
    });
  };

  const reload = () => buildTasksState();

  useEffect(() => {
    if (currentUser && signedIn && currentUser.email) buildTasksState();
  }, [currentUser, signedIn]);

  useEffect(() => {
    if (currentUser) {
      updateStreak();
    }
  }, [currentUser]);

  const registerAction = (action: string) => {
    if (!currentUser && !signedIn) return;
    if (tasksState.length === 0) return;

    const newState = tasksState.map((task) => {
      const currentTask = TASKS.find((filterTask) => filterTask.id === task.id);

      if (task.nextAction === action && currentTask) {
        const nextActionIndex = currentTask.actions.indexOf(action) + 1;
        const nextAction = currentTask.actions[nextActionIndex];

        if (nextAction) {
          return {
            ...task,
            nextAction,
          };
        } else if (!task.done) {
          completeTask(task.id);
          setHasCompletedATask(true);
          return {
            ...task,
            done: true,
            type: currentTask.type,
            timesCompleted: task.timesCompleted + 1,
            expiresAt: currentTask.type === "daily" ? nextDay() : nextMonth(),
          };
        }
      }

      return task;
    });

    setTasksState(newState);
    if (allDone(newState)) {
      toast({
        type: "custom",
        backgroundColor: theme.colors.feedback.success[50],
        borderColor: theme.colors.brand.primary[500],
        textColor: theme.colors.brand.primary[900],
        icon: "celebration",
        iconColor: theme.colors.brand.primary[500],
        message: t("allTasksCompleted"),
        closeButton: false,
        position: isMobile ? "bottom" : "top-right",
      });
    }
  };

  useEffect(() => {
    const taskDownloadApp = TASKS.filter(
      (task) => task.title === "download_app",
    )[0];

    const done = tasksState?.find(
      (task) => task.id === taskDownloadApp.id,
    )?.done;
    if (donateApp && !done) {
      registerAction("download_app");
    }

    if (
      tasksStatistics?.firstCompletedAllTasksAt === null &&
      allDone(tasksState)
    ) {
      completeAllTasks();
      refetchTasksStatistics();
    }
  }, [buildTasksState, tasksState]);

  const tasksObject: ITasksContext = useMemo(
    () => ({
      hasCompletedATask,
      setHasCompletedATask,
      tasksState,
      registerAction,
      reload,
      tasksStatistics,
    }),
    [tasksState, hasCompletedATask],
  );

  return (
    <TasksContext.Provider value={tasksObject}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  return context;
}
