import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardSideImageButton from "components/moleculars/cards/CardSideImageButton";
import image from "assets/images/newspaper.svg";
import theme from "styles/theme";
import CardCircleImage from "components/moleculars/cards/CardCircleImage";
import Carousel, { Props } from ".";

const { primary } = theme.colors.brand;

export default {
  title: "Carousel",
  component: Carousel,
  parameters: {
    backgrounds: {
      default: "color.brand.primary[300]",
      values: [{ name: "color.brand.primary[300]", value: primary[300] }],
    },
  },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = function (args: Props) {
  return <Carousel {...args} />;
};

export const Default = Template.bind({});
export const Free = Template.bind({});
export const FreeSnap = Template.bind({});
export const CircleCard = Template.bind({});

const children = [
  <CardSideImageButton
    icon={image}
    title="title"
    onClick={() => {}}
    buttonText="button"
  />,
  <CardSideImageButton
    icon={image}
    title="title"
    onClick={() => {}}
    buttonText="button"
  />,
  <CardSideImageButton
    icon={image}
    title="title"
    onClick={() => {}}
    buttonText="button"
  />,
  <CardSideImageButton
    icon={image}
    title="title"
    onClick={() => {}}
    buttonText="button"
  />,
  <CardSideImageButton
    icon={image}
    title="title"
    onClick={() => {}}
    buttonText="button"
  />,
];

Default.args = {
  sliderPerView: 3,
  spacing: 10,
  children,
};
Free.args = {
  sliderPerView: 3,
  spacing: 10,
  children,
  mode: "free",
};
FreeSnap.args = {
  sliderPerView: 3,
  spacing: 10,
  children,
  mode: "free-snap",
};

CircleCard.args = {
  sliderPerView: 2,
  spacing: 10,
  children: [
    <CardCircleImage image={image} title="title" subtitle="subtitle" />,
    <CardCircleImage image={image} title="title" subtitle="subtitle" />,
    <CardCircleImage image={image} title="title" subtitle="subtitle" />,
    <CardCircleImage image={image} title="title" subtitle="subtitle" />,
  ],
};
