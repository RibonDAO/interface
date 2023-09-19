import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardLargeImage, { Props } from ".";

export default {
  title: "CardLargeImage",
  component: CardLargeImage,
} as ComponentMeta<typeof CardLargeImage>;

const Template: ComponentStory<typeof CardLargeImage> = function (args: Props) {
  return <CardLargeImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Donate $10 and impact",
  subtitle: "+20 lives",
  description: "with water",
  buttonText: "Donate $10",
};
