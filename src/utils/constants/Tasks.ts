/*
 * NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
 * is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
 */

import { beginningOfToday } from "lib/dateUtils";

export interface Task {
  id: string;
  title: string;
  actions: string[];
  type: string;
  navigationCallback?: string;
  isVisible: (params?: any) => boolean;
}

export const TASKS = [
  {
    id: "af13a631-3d3d-4709-8f90-06a938f4cef6",
    title: "donate_ticket",
    actions: ["donation_done_page_view"],
    type: "daily",
    navigationCallback: "/causes",
    isVisible(this: Task) {
      return true;
    },
  },
  {
    id: "9177df10-8e93-4938-b2fb-e04b138127f7",
    title: "download_app",
    actions: ["download_app"],
    navigationCallback: "/app-download",
    type: "daily",
    isVisible(this: Task, params?: any) {
      const taskState = params?.state.find((obj: any) => obj.id === this.id);
      const timesCompleted = taskState?.timesCompleted || 0;
      const taskDone = taskState?.done;
      const lastCompletedAt = new Date(
        taskState?.lastCompletedAt?.slice(0, 19),
      );
      const completedDay = lastCompletedAt < beginningOfToday();

      if (timesCompleted === 0 && !taskDone) {
        return true;
      } else if (timesCompleted === 1 && taskDone && !completedDay) {
        return true;
      }

      return false;
    },
  },
  {
    id: "ed180aa8-e8e7-11ed-a05b-0242ac120003",
    title: "make_contribution",
    actions: ["contribution_done_page_view"],
    type: "monthly",
    navigationCallback: "/promoters/support-non-profit",
    isVisible(this: Task) {
      return true;
    },
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
