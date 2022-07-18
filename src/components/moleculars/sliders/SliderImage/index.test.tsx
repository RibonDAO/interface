import { fireEvent, waitFor } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import SliderImage, { Props } from ".";

const setup = ({ sliderImages }: Props) => {
  const { component } = renderComponent(
    <SliderImage sliderImages={sliderImages} />,
  );

  return component;
};

const clickToSlide = (element: Element, amountOfTime: number) => {
  setTimeout(() => {
    fireEvent.click(element);
  }, amountOfTime);
};

describe("SliderImage", () => {
  describe("when render a single image on slider", () => {
    const sliderProps = {
      sliderImages: [{ imageUrl: "https://picsum.photos/600/600" }],
    };
    it("shouldn't display arrows to swipe slider", () => {
      const { getByTestId } = setup(sliderProps);

      expect(getByTestId("arrow-left")).toHaveStyle(
        "background-color: rgba(0, 0, 0, 0)",
      );
      expect(getByTestId("arrow-right")).toHaveStyle(
        "background-color: rgba(0, 0, 0, 0)",
      );
    });

    it("should display correctly slider size on pagination", () => {
      const { getByRole } = setup({
        sliderImages: [{ imageUrl: "https://picsum.photos/600/600" }],
      });

      expect(getByRole("heading", { level: 5 })).toHaveTextContent(
        `1/${sliderProps.sliderImages.length}`,
      );
    });
  });

  describe("when render more than one image on slider", () => {
    const sliderProps = {
      sliderImages: [
        { imageUrl: "https://picsum.photos/600/600?random=2" },
        { imageUrl: "https://picsum.photos/600/600?random=3" },
        { imageUrl: "https://picsum.photos/600/600?random=3" },
      ],
    };
    describe("when current image is the first", () => {
      it("should be possible to slide to next image", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        clickToSlide(getByTestId("arrow-right"), 0);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `2/${sliderProps.sliderImages.length}`,
          );
        });
      });
      it("shouldn't be possible to slide to previous image", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        clickToSlide(getByTestId("arrow-left"), 0);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `1/${sliderProps.sliderImages.length}`,
          );
        });
      });
    });
    describe("when current image isn't the first or the last", () => {
      it("should be possible to slide to next image", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        clickToSlide(getByTestId("arrow-right"), 0);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `2/${sliderProps.sliderImages.length}`,
          );
        });
      });
      it("should be possible to slide to previous image", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        clickToSlide(getByTestId("arrow-right"), 0);
        clickToSlide(getByTestId("arrow-left"), 100);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `1/${sliderProps.sliderImages.length}`,
          );
        });
      });
    });
    describe("when current image is the last", () => {
      it("shouldn't be possible to slide to next image", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        clickToSlide(getByTestId("arrow-right"), 0);
        clickToSlide(getByTestId("arrow-right"), 100);
        clickToSlide(getByTestId("arrow-right"), 300);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `3/${sliderProps.sliderImages.length}`,
          );
        });
      });
      it("should be possible to slide to previous image", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        clickToSlide(getByTestId("arrow-right"), 0);
        clickToSlide(getByTestId("arrow-right"), 100);
        clickToSlide(getByTestId("arrow-left"), 300);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `2/${sliderProps.sliderImages.length}`,
          );
        });
      });
    });
  });

  describe("when a video link is passed as prop ", () => {
    it("should render video instead an image", () => {
      const sliderProps = {
        sliderImages: [
          {
            imageUrl:
              "https://img-9gag-fun.9cache.com/photo/a81OBv1_460svvp9.webm",
          },
        ],
      };

      const { getByLabelText } = setup(sliderProps);

      expect(getByLabelText("video-0")).toBeInTheDocument();
    });
  });
});
