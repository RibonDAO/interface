import { ComponentStory, ComponentMeta } from "@storybook/react";
import { theme } from "@ribon.io/shared/styles";
import Title, { Props } from ".";

export default {
  title: "Title",
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = function (args: Props) {
  return <Title {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Gift’s progress",
  icon: {
    name: "alarm",
    color: theme.colors.brand.primary[600],
  },
  secondaryColor: theme.colors.brand.primary[50],
};
