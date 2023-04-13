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

export type TaskStateItem = {
  id: string;
  nextAction: string;
  done: boolean;
  expiresAt: string;
};

export interface ITasksContext {
  tasksState: TaskStateItem[];
  registerAction: (action: string) => void;
}

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

function TasksProvider({ children }: any) {
  const [tasksState, setTasksState] = useState<any[]>([]);
  const { findCompletedTasks, completeTask } = useCompletedTasks();
  const { currentUser, signedIn } = useCurrentUser();

  const isDone = (task: CompletedTask | undefined) => {
    if (!task) return false;
    const lastCompletedAt = new Date(task.lastCompletedAt);
    const taskObject = TASKS.find((t) => t.id === task.taskIdentifier);

    const baseDate =
      taskObject?.type === "daily"
        ? beginningOfToday()
        : beginningOfThisMonth();

    if (baseDate > lastCompletedAt) return false;

    return true;
  };

  const isExpired = (task: CompletedTask | undefined) => {
    if (!task) return false;

    const taskObject = TASKS.find((t) => t.id === task.taskIdentifier);

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
          (t) => t.taskIdentifier === task.id,
        );

        return {
          id: task.id,
          nextAction: task.actions[0],
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
      const currentTask = TASKS.find((t) => t.id === task.id);

      if (task.nextAction === action && currentTask) {
        const nextActionIndex = currentTask.actions.indexOf(action) + 1;
        const nextAction = currentTask.actions[nextActionIndex];

        if (nextAction) {
          return {
            ...task,
            nextAction,
          };
        } else {
          completeTask(task.id);
          return {
            ...task,
            done: true,
            expiresAt: currentTask.type === "daily" ? nextDay() : nextMonth(),
          };
        }
      }

      return task;
    });

    setTasksState(newState);
  };

  const tasksObject: ITasksContext = useMemo(
    () => ({
      tasksState,
      registerAction,
    }),
    [tasksState],
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
