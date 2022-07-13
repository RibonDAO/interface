import { fireEvent, waitFor } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import SliderImage, { Props } from ".";

const setup = ({ sliderImages }: Props) => {
  const { component } = renderComponent(
    <SliderImage sliderImages={sliderImages} />,
  );

  return component;
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
      it("should display only right arrow to swipe slider", () => {
        const { getByTestId } = setup(sliderProps);

        expect(getByTestId("arrow-left")).toHaveStyle(
          "background-color: rgba(0,0,0,0)",
        );
        expect(getByTestId("arrow-right")).toHaveStyle(
          "background-color: rgba(0,0,0,0.6)",
        );
      });
    });
    describe("when current image isn't the first or the last", () => {
      it("should display both right and left arrow to swipe slider", async () => {
        const { getByTestId, findByTestId, findByRole } = setup(sliderProps);

        fireEvent.click(getByTestId("arrow-right"));

        await waitFor(async () => {
          expect(await findByTestId("arrow-left")).toHaveStyle(
            "background-color: rgba(0,0,0,0.6)",
          );
          expect(await findByTestId("arrow-right")).toHaveStyle(
            "background-color: rgba(0,0,0,0.6)",
          );
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `2/${sliderProps.sliderImages.length}`,
          );
        });
      });
      it("should display correctly slider size on pagination", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        fireEvent.click(getByTestId("arrow-right"));

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `2/${sliderProps.sliderImages.length}`,
          );
        });
      });
    });
    describe("when current image is the last", () => {
      it("should display only left arrow to swipe slider", async () => {
        const { getByTestId, findByTestId } = setup(sliderProps);

        fireEvent.click(getByTestId("arrow-right"));
        setTimeout(() => {
          fireEvent.click(getByTestId("arrow-right"));
        }, 100);

        await waitFor(async () => {
          expect(await findByTestId("arrow-left")).toHaveStyle(
            "background-color: rgba(0,0,0,0.6)",
          );
          expect(await findByTestId("arrow-right")).toHaveStyle(
            "background-color: rgba(0,0,0,0)",
          );
        });
      });
      it("should display correctly slider size on pagination", async () => {
        const { getByTestId, findByRole } = setup(sliderProps);

        fireEvent.click(getByTestId("arrow-right"));
        setTimeout(() => {
          fireEvent.click(getByTestId("arrow-right"));
        }, 100);

        await waitFor(async () => {
          expect(await findByRole("heading", { level: 5 })).toHaveTextContent(
            `3/${sliderProps.sliderImages.length}`,
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
