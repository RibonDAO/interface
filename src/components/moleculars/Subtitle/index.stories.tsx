import { ComponentStory, ComponentMeta } from "@storybook/react";
import { theme } from "@ribon.io/shared/styles";
import Subtitle, { Props } from ".";

export default {
  text: "Subtitle",
  component: Subtitle,
} as ComponentMeta<typeof Subtitle>;

const Template: ComponentStory<typeof Subtitle> = function (args: Props) {
  return <Subtitle {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "Gift’s progress",
  icon: {
    name: "alarm",
    color: theme.colors.brand.primary[600],
  },
  secondaryColor: theme.colors.brand.primary[50],
};
