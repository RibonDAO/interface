import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import React from "react";
import ArticleLayout from ".";

describe("CardCenterImageButton", () => {
  it("should render without error", () => {
    const article = {
      id: 1,
      title: "Ribon",
      link: "https://ribon.io",
      imageUrl: "https://ribon.io",
      publishedAt: "2021-01-01",
      publishedAtInWords: "1 day ago",
      visible: true,
      author: {
        id: 1,
        name: "Ribon",
      },
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    };
    renderComponent(
      <ArticleLayout article={article} readMoreText="Read now" />,
    );
    expect(screen.getByText("Read now")).toBeDefined();
  });
});
