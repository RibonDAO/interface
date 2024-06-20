import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SliderCardsEnhanced from ".";

describe("SliderCards", () => {
  const mockFn = jest.fn();
  it("should render without error", () => {
    renderComponent(
      <SliderCardsEnhanced currentSlide={1} onCurrentSlideChange={mockFn} show>
        <div key={1}>1</div>
        <div key={2}>2</div>
        <div key={3}>3</div>
        <div key={4}>4</div>
        <div key={5}>5</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with loop", () => {
    renderComponent(
      <SliderCardsEnhanced
        currentSlide={1}
        onCurrentSlideChange={mockFn}
        loop
        show
      >
        <div key={1}>1</div>
        <div key={2}>2</div>
        <div key={3}>3</div>
        <div key={4}>4</div>
        <div key={5}>5</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with saveStateIdentifier", () => {
    renderComponent(
      <SliderCardsEnhanced
        show
        currentSlide={1}
        onCurrentSlideChange={mockFn}
        saveStateIdentifier="test"
      >
        <div key={1}>1</div>
        <div key={2}>2</div>
        <div key={3}>3</div>
        <div key={4}>4</div>
        <div key={5}>5</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with saveStateIdentifier and loop", () => {
    renderComponent(
      <SliderCardsEnhanced
        show
        currentSlide={1}
        onCurrentSlideChange={mockFn}
        saveStateIdentifier="test"
        loop
      >
        <div key={1}>1</div>
        <div key={2}>2</div>
        <div key={3}>3</div>
        <div key={4}>4</div>
        <div key={5}>5</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with saveStateIdentifier and loop and currentSlide 0", () => {
    renderComponent(
      <SliderCardsEnhanced
        show
        currentSlide={0}
        onCurrentSlideChange={mockFn}
        saveStateIdentifier="test"
        loop
      >
        <div key={1}>1</div>
        <div key={2}>2</div>
        <div key={3}>3</div>
        <div key={4}>4</div>
        <div key={5}>5</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });
});
