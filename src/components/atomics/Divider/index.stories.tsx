import { ComponentStory, ComponentMeta } from "@storybook/react";
import theme from "styles/theme";
import Divider, { Props } from ".";

export default {
  title: "Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = function (args: Props) {
  return <Divider {...args} />;
};

export const Default = Template.bind({});
export const WithText = Template.bind({});

Default.args = {
  color: theme.colors.mediumGreen,
  width: "100px",
};

WithText.args = {
  text: "Divider",
  color: theme.colors.mediumGreen,
};
