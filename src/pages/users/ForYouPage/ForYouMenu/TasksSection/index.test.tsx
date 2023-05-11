import { userFactory, usersApi } from "@ribon.io/shared";
import { renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { mockRequest } from "config/testUtils/test-helper";
import { today } from "lib/dateTodayFormatter";

import TasksSection from ".";

describe("TasksSection", () => {
  const singleTask = {
    id: 1,
    taskIdentifier: "task-identifier",
    lastCompletedAt: "2021-01-01T00:00:00.000Z",
    timesCompleted: 1,
  };

  const data = [singleTask];
  const user = userFactory({ id: 1 });
  const userTasksStatistics = {
    firstCompletedAllTasksAt: today,
    streak: 1,
    contributor: true,
  };

  mockRequest("/api/v1/users/tasks_statistics", {
    method: "GET",
    payload: {
      userTasksStatistics,
    },
  });

  mockRequest("/api/v1/users/update_streak", {
    method: "POST",
    payload: {
      streak: 1,
    },
  });

  beforeEach(async () => {
    usersApi.getCompletedTasks = jest.fn(() => ({ data } as any));
    usersApi.postCompleteTask = jest.fn(() => ({ data } as any));

    renderComponent(<TasksSection />, {
      currentUserProviderValue: {
        currentUser: user,
      },
    });

    await waitForPromises();
  });
  it("should render without error", () => {
    expectTextToBeInTheDocument("Tasks");
  });
});
