import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button, { ButtonProps } from ".";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      options: ["large", "medium", "small"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = function (args: ButtonProps) {
  return <Button {...args} />;
};

export const Primary = Template.bind({});
export const Outline = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
  text: "Button",
};

Outline.args = {
  text: "Button",
  outline: true,
};

Disabled.args = {
  text: "Button",
  disabled: true,
};
