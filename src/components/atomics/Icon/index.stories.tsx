import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon, { Props } from ".";

export default {
  name: "Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = function (args: Props) {
  return <Icon {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: "bolt",
};
