import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip, { Props } from "./index";

export default {
  title: "Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = function (args: Props) {
  return <Tooltip {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "Text of tooltip",
  textRight: "Tooltip With Text",
  symbol: "?",
};
