import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardCenterImageButton from "components/moleculars/cards/CardCenterImageButton";
import SliderCards, { Props } from ".";

export default {
  title: "SliderCards",
  component: SliderCards,
} as ComponentMeta<typeof SliderCards>;

const Template: ComponentStory<typeof SliderCards> = function (args: Props) {
  return <SliderCards {...args} />;
};

export const Default = Template.bind({});

const children = [
  <CardCenterImageButton
    key="1"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="2"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="3"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="4"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="5"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="5"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="5"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
  <CardCenterImageButton
    key="5"
    image="https://picsum.photos/600/600?random=2"
    title="title"
    onClickButton={() => {}}
    buttonText="button"
  />,
];

Default.args = {
  children,
  scrollOffset: 400,
};
