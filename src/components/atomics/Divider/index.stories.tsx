import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getPrimary } from "styles/colors/utils";
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
  color: getPrimary(theme).colorBrandPrimary300,
  width: "100px",
};

WithText.args = {
  text: "Divider",
  color: getPrimary(theme).colorBrandPrimary300,
};
