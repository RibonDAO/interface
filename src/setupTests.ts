import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { jestPreviewConfigure } from "jest-preview";
import "./styles/globalStyle";

export const mockNavigationFunction = jest.fn();
export const mockNavigateBackFunction = jest.fn();
export const mockLogErrorFunction = jest.fn();
export const mockLogEventFunction = jest.fn();
export const mockLogPageViewFunction = jest.fn();
export const mockLocationReload = jest.fn();
export const mockLocationReplace = jest.fn();
export const mockZendeskOpenChatFunction = jest.fn();

export function setupMocks() {
  jest.mock("hooks/useNavigation", () => ({
    __esModule: true,
    default: () => ({
      navigateTo: mockNavigationFunction,
      history: { location: {}, search: "" },
      navigateBack: mockNavigateBackFunction,
    }),
  }));
  jest.mock("services/crashReport", () => ({
    __esModule: true,
    logError: mockLogErrorFunction,
  }));
  jest.mock("lib/events", () => ({
    __esModule: true,
    logEvent: mockLogEventFunction,
    logPageView: mockLogPageViewFunction,
  }));
  jest.mock("config/zendesk/features", () => ({
    __esModule: true,
    ZendeskOpenChat: mockZendeskOpenChatFunction,
  }));
  delete (window as any).location;
  (window as any).location = {
    reload: mockLocationReload,
    replace: mockLocationReload,
  };
}

setupMocks();

jestPreviewConfigure({
  // Opt-in to automatic mode to preview failed test case automatically.
  autoPreview: false,
});
