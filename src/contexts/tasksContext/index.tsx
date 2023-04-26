import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TASKS } from "utils/constants/Tasks";
import {
  beginningOfThisMonth,
  beginningOfToday,
  nextDay,
  nextMonth,
} from "lib/dateUtils";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCompletedTasks } from "@ribon.io/shared/hooks";
import { CompletedTask } from "@ribon.io/shared/types/apiResponses";
import { theme } from "@ribon.io/shared/styles";
import useToast from "hooks/useToast";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

export type TaskStateItem = {
  id: string;
  nextAction: string;
  done: boolean;
  expiresAt: string;
  timesCompleted: number;
};

export interface ITasksContext {
  hasCompletedATask: boolean;
  setHasCompletedATask: (value: boolean) => void;
  tasksState: TaskStateItem[];
  registerAction: (action: string) => void;
}

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

function TasksProvider({ children }: any) {
  const [tasksState, setTasksState] = useState<any[]>([]);
  const [hasCompletedATask, setHasCompletedATask] = useState(false);
  const { findCompletedTasks, completeTask } = useCompletedTasks();
  const { currentUser, signedIn } = useCurrentUser();
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.tasksContext",
  });

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
    return tasks.every((task: any) => task.done === true);
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
          timesCompleted: currentTask?.timesCompleted || 0,
          done: isDone(currentTask),
          expiresAt: isExpired(currentTask),
        };
      });
      setTasksState(state);
    });
  };

  useEffect(() => {
    if (currentUser && signedIn && currentUser.email) buildTasksState();
  }, [currentUser, signedIn]);

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
            timesCompleted: task.timesCompleted + 1,
            expiresAt: currentTask.type === "daily" ? nextDay() : nextMonth(),
          };
        }
      }

      return task;
    });

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
        position: isMobile ? "top-center" : "top-right",
      });
    }
  };

  const tasksObject: ITasksContext = useMemo(
    () => ({
      hasCompletedATask,
      setHasCompletedATask,
      tasksState,
      registerAction,
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
