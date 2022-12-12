import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import SliderCardsEnhanced from ".";

export default {
  title: "SliderCardsEnhanced",
  component: SliderCardsEnhanced,
} as ComponentMeta<typeof SliderCardsEnhanced>;

const Template: ComponentStory<typeof SliderCardsEnhanced> = function (
  args: any,
) {
  return <SliderCardsEnhanced {...args} />;
};

export const Default = Template.bind({});

const children = [
  <div className="card-slider__slide" key="1">
    <CardCenterImageButton
      key="1"
      image="https://picsum.photos/600/600?random=1"
      title="title"
      onClickButton={() => {}}
      buttonText="button"
    />
  </div>,
  <div className="card-slider__slide" key="2">
    <CardCenterImageButton
      key="1"
      image="https://picsum.photos/600/600?random=2"
      title="title"
      onClickButton={() => {}}
      buttonText="button"
    />
  </div>,
  <div className="card-slider__slide" key="3">
    <CardCenterImageButton
      key="1"
      image="https://picsum.photos/600/600?random=3"
      title="title"
      onClickButton={() => {}}
      buttonText="button"
    />
  </div>,
  <div className="card-slider__slide" key="4">
    <CardCenterImageButton
      key="1"
      image="https://picsum.photos/600/600?random=4"
      title="title"
      onClickButton={() => {}}
      buttonText="button"
    />
  </div>,
];

Default.args = {
  children,
};
