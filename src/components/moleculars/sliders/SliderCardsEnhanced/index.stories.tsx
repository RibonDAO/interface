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
  <CardCenterImageButton
    key="1"
    image="https://picsum.photos/600/600?random=1"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="1"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="1"
    image="https://picsum.photos/600/600?random=3"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="1"
    image="https://picsum.photos/600/600?random=4"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
];

Default.args = {
  children,
};
