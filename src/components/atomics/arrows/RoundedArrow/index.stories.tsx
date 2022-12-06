import { ComponentStory, ComponentMeta } from "@storybook/react";
import RoundedArrow, { Props } from ".";

export default {
  title: "RoundedArrow",
  component: RoundedArrow,
} as ComponentMeta<typeof RoundedArrow>;

const Template: ComponentStory<typeof RoundedArrow> = function (args: Props) {
  return <RoundedArrow {...args} />;
};

export const Top = Template.bind({});
export const Bottom = Template.bind({});
export const Left = Template.bind({});
export const Right = Template.bind({});

Top.args = {
  direction: "top",
};

Bottom.args = {
  direction: "bottom",
};

Left.args = {
  direction: "left",
};

Right.args = {
  direction: "right",
};
