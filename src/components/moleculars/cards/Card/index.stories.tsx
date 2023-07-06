import { ComponentStory, ComponentMeta } from "@storybook/react";
import { theme } from "@ribon.io/shared/styles";
import Card, { Props } from ".";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = function (args: Props) {
  return <Card {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: <div>test</div>,
  backgroundColor: theme.colors.neutral[25],
  border: true,
};
