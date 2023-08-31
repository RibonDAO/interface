import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProgressBar, { Props as ProgressBarProps } from ".";

export default {
  name: "ProgressBar",
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = function (
  args: ProgressBarProps,
) {
  return <ProgressBar {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  max: 100,
  value: 50,
};
