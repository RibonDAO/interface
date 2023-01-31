import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTextImageTooltip, { Props } from ".";

export default {
  title: "CardTextImageTooltip",
  component: CardTextImageTooltip,
} as ComponentMeta<typeof CardTextImageTooltip>;

const Template: ComponentStory<typeof CardTextImageTooltip> = function (
  args: Props,
) {
  return <CardTextImageTooltip {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "text",
  title: "CardTextImageTooltip",
  tooltipSymbol: "i",
  tooltipText: "tooltip",
  icon: "https://picsum.photos/200",
  value: "100",
  infoLeft: "22/02/2022",
};
