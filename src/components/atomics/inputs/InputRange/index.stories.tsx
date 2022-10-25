import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputRange, { Props } from ".";

export default {
  title: "InputRange",
  component: InputRange,
} as ComponentMeta<typeof InputRange>;

const Template: ComponentStory<typeof InputRange> = function (args: Props) {
  return <InputRange {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  onChange: () => {},
};
