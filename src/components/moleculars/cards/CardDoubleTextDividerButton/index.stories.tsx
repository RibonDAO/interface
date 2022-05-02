import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardDoubleTextDividerButton, { Props } from "./index";

export default {
  title: "CardDoubleTextDividerButton",
  component: CardDoubleTextDividerButton,
} as ComponentMeta<typeof CardDoubleTextDividerButton>;

const Template: ComponentStory<typeof CardDoubleTextDividerButton> = function (
  args: Props,
) {
  return <CardDoubleTextDividerButton {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  firstText: "22/02/2022",
  mainText: "12.00",
  rightComplementText: "USDC",
  buttonText: "see transaction",
  rightComponentButton: "icon",
};
