import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardEmptySection, { Props } from ".";

export default {
  title: "CardEmptySection",
  component: CardEmptySection,
} as ComponentMeta<typeof CardEmptySection>;

const Template: ComponentStory<typeof CardEmptySection> = function (
  args: Props,
) {
  return <CardEmptySection {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  cardText: "CardEmptySection",
  btnText: "Button",
};
