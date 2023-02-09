import { ComponentStory, ComponentMeta } from "@storybook/react";
import theme from "styles/theme";
import Loader, { Props } from ".";

export default {
  title: "Loader",
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = function (args: Props) {
  return <Loader {...args} />;
};

export const Default = Template.bind({});
export const Black = Template.bind({});

Black.args = {
  color: theme.colors.neutral[800],
};
