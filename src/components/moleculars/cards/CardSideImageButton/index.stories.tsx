import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardImage from "assets/images/newspaper.svg";
import theme from "styles/theme";
import CardSideImageButton, { Props } from "./index";

export default {
  title: "CardSideImageButton",
  component: CardSideImageButton,
  parameters: {
    backgrounds: {
      default: "green30",
      values: [{ name: "green30", value: theme.colors.green30 }],
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
