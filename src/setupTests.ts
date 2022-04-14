import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { initializeFirebase } from "./services";

export const mockNavigationFunction = jest.fn();
export const mockLogErrorFunction = jest.fn();
export const mockLogEventFunction = jest.fn();

function setupMocks() {
  jest.mock("hooks/useNavigation", () => ({
    __esModule: true,
    default: () => ({
      navigateTo: mockNavigationFunction,
      history: { location: {}, search: "" },
    }),
  }));
  jest.mock("services/crashReport", () => ({
    __esModule: true,
    logError: mockLogErrorFunction,
  }));
  jest.mock("services/analytics", () => ({
    __esModule: true,
    logEvent: mockLogEventFunction,
  }));
}

setupMocks();
initializeFirebase();
