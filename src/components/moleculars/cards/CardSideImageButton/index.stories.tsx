import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardImage from "assets/images/newspaper.svg";
import theme from "styles/theme";
import CardSideImageButton, { Props } from "./index";

export default {
  title: "CardSideImageButton",
  component: CardSideImageButton,
  parameters: {
    backgrounds: {
      default: "mediumGreen",
      values: [{ name: "mediumGreen", value: theme.colors.mediumGreen }],
    },
  },
} as ComponentMeta<typeof CardSideImageButton>;

const Template: ComponentStory<typeof CardSideImageButton> = function (
  args: Props,
) {
  return <CardSideImageButton {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  buttonText: "text",
  icon: CardImage,
  title: "Title",
  counter: 5,
  ribons: 100,
};
