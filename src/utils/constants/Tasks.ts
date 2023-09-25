/*
 * NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
 * is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
 */

import { useExperiment } from "@growthbook/growthbook-react";
import { beginningOfToday } from "lib/dateUtils";
import { logEvent } from "lib/events";

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

      const variation = useExperiment({
        key: "understanding-test",
        variations: ["control", "product", "growth"],
      });

      if (timesCompleted === 0 && !taskDone) {
        logEvent("downloadCTA_view", {
          from: "tasks",
          variation: variation.value,
        });
        return true;
      } else if (timesCompleted === 1 && taskDone && !completedDay) {
        logEvent("downloadCTA_view", {
          from: "tasks",
          variation: variation.value,
        });
        return true;
      }

      return false;
    },
  },
  {
    id: "2fd05af5-e67d-4640-b674-efe949ad5b51",
    title: "view_about_page",
    actions: ["about_page_view"],
    type: "daily",
    navigationCallback: "/about",
    isVisible(this: Task, params?: any) {
      const variation = useExperiment({
        key: "understanding-test",
        variations: ["control", "product", "growth"],
      });

      if (variation.value !== "growth") return false;
      const taskState = params?.state.find((obj: any) => obj.id === this.id);

      const lastCompletedAt = new Date(
        taskState?.lastCompletedAt?.slice(0, 19),
      );
      const timesCompleted = taskState?.timesCompleted || 0;
      const taskDone = taskState?.done;

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
    id: "cad1bf70-6728-4900-83b3-f41171145cf2",
    title: "survey_form",
    actions: ["survey_form_view"],
    type: "daily",
    navigationCallback: "/survey",
    isVisible(this: Task, params?: any) {
      const taskState = params?.state.find((obj: any) => obj.id === this.id);

      const lastCompletedAt = new Date(
        taskState?.lastCompletedAt?.slice(0, 19),
      );
      const timesCompleted = taskState?.timesCompleted || 0;
      const taskDone = taskState?.done;

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
  {
    id: "ee397e16-de1b-11ed-b5ea-0242ac120002",
    title: "check_daily_news",
    actions: ["for_you_news_tab_view"],
    type: "daily",
    navigationCallback: "ForYouScreen",
    isVisible(this: Task) {
      return true;
    },
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
