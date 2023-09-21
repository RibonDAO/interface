import { renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import SurveyPage from ".";

jest.mock("hooks/useLanguage", () => ({
  __esModule: true,
  useLanguage: () => ({
    currentLang: "pt-BR",
  }),
}));

describe("SurveyPage", () => {
  it("should render without error", () => {
    renderComponent(<SurveyPage />);
    const bannerElement = screen.getByTestId("survey-page");
    expect(bannerElement).toBeInTheDocument();
  });
});
