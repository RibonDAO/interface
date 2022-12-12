import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SliderCardsEnhanced from ".";

describe("SliderCards", () => {
  const mockFn = jest.fn();
  it("should render without error", () => {
    renderComponent(
      <SliderCardsEnhanced currentSlide={1} onCurrentSlideChange={mockFn}>
        <div className="card-slider__slide">1</div>
        <div className="card-slider__slide">2</div>
        <div className="card-slider__slide">3</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with loop", () => {
    renderComponent(
      <SliderCardsEnhanced currentSlide={1} onCurrentSlideChange={mockFn} loop>
        <div className="card-slider__slide">1</div>
        <div className="card-slider__slide">2</div>
        <div className="card-slider__slide">3</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with saveStateIdentifier", () => {
    renderComponent(
      <SliderCardsEnhanced
        currentSlide={1}
        onCurrentSlideChange={mockFn}
        saveStateIdentifier="test"
      >
        <div className="card-slider__slide">1</div>
        <div className="card-slider__slide">2</div>
        <div className="card-slider__slide">3</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with saveStateIdentifier and loop", () => {
    renderComponent(
      <SliderCardsEnhanced
        currentSlide={1}
        onCurrentSlideChange={mockFn}
        saveStateIdentifier="test"
        loop
      >
        <div className="card-slider__slide">1</div>
        <div className="card-slider__slide">2</div>
        <div className="card-slider__slide">3</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });

  it("should render with saveStateIdentifier and loop and currentSlide 0", () => {
    renderComponent(
      <SliderCardsEnhanced
        currentSlide={0}
        onCurrentSlideChange={mockFn}
        saveStateIdentifier="test"
        loop
      >
        <div className="card-slider__slide">1</div>
        <div className="card-slider__slide">2</div>
        <div className="card-slider__slide">3</div>
      </SliderCardsEnhanced>,
    );

    expectTextToBeInTheDocument("1");
  });
});
