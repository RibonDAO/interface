import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTooltip, { Props } from ".";

export default {
  title: "CardTooltip",
  component: CardTooltip,
} as ComponentMeta<typeof CardTooltip>;

const Template: ComponentStory<typeof CardTooltip> = function (args: Props) {
  return <CardTooltip {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "text",
  title: "CardTooltip",
  tooltipSymbol: "i",
  tooltipText: "tooltip",
  icon: "https://picsum.photos/200",
  value: "100",
  infoLeft: "22/02/2022",
};
