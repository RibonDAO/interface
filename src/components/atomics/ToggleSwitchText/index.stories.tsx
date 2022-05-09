import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleSwitchText, { Props } from ".";

export default {
  title: "ToggleSwitchText",
  component: ToggleSwitchText,
} as ComponentMeta<typeof ToggleSwitchText>;

const Template: ComponentStory<typeof ToggleSwitchText> = function (
  args: Props,
) {
  return <ToggleSwitchText {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  leftText: "texto 1",
  rightText: "texto 2",
  onClick: () => {},
};
