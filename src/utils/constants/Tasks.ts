/*
 * NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
 * is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
 */

export const TASKS = [
  {
    id: "af13a631-3d3d-4709-8f90-06a938f4cef6",
    title: "donate_ticket",
    actions: ["donation_done_page_view"],
    type: "daily",
    navigationCallback: "/",
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
