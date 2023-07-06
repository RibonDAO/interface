import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon, { IconProps } from ".";

export default {
  name: "Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = function (args: IconProps) {
  return <Icon {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: "bolt",
};
