import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardBlank, { Props } from ".";

export default {
  title: "CardBlank",
  component: CardBlank,
} as ComponentMeta<typeof CardBlank>;

const Template: ComponentStory<typeof CardBlank> = function (args: Props) {
  return <CardBlank {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: <div>test</div>,
};
