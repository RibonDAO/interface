import { ComponentStory, ComponentMeta } from "@storybook/react";
import theme from "styles/theme";
import Spinner, { Props } from ".";

export default {
  title: "Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const { primary } = theme.colors.brand;

const Template: ComponentStory<typeof Spinner> = function (args: Props) {
  return <Spinner {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  strokeColor: primary[300],
};
