import { ComponentStory, ComponentMeta } from "@storybook/react";
import { theme } from "@ribon.io/shared/styles";
import Banner, { Props } from ".";

export default {
  title: "Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = function (args: Props) {
  return <Banner {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: <div>test</div>,
  text: "test",
  textColor: theme.colors.neutral[100],
  cardBackground: theme.colors.neutral[25],
};
