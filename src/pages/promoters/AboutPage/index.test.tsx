import { renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import AboutPage from ".";

jest.mock("hooks/useLanguage", () => ({
  __esModule: true,
  useLanguage: () => ({
    currentLang: "pt-BR",
  }),
}));

describe("AboutPage", () => {
  it("should render without error", () => {
    renderComponent(<AboutPage />);
    const bannerElement = screen.getByTestId("about-page");
    expect(bannerElement).toBeInTheDocument();
  });
});
