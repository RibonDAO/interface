import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonSwitch, { Props } from ".";

export default {
  title: "ButtonSwitch",
  component: ButtonSwitch,
} as ComponentMeta<typeof ButtonSwitch>;

const Template: ComponentStory<typeof ButtonSwitch> = function (args: Props) {
  return <ButtonSwitch {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  leftText: "PT",
  rightText: "EN",
  onSwitch: (checked) => {
    console.log(checked);
  },
};
