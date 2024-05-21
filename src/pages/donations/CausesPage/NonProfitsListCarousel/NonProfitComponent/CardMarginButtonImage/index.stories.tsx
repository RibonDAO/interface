import { ComponentStory, ComponentMeta } from "@storybook/react";

import CardMarginButtonImage, { Props } from ".";

export default {
  title: "CardMarginButtonImage",
  component: CardMarginButtonImage,
} as ComponentMeta<typeof CardMarginButtonImage>;

const Template: ComponentStory<typeof CardMarginButtonImage> = function (
  args: Props,
) {
  return <CardMarginButtonImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  firstButtonText: "First Button",
  secondButtonText: "Second Button",
  onFirstButtonClick: () => {},
  onSecondButtonClick: () => {},
  topImage: "https://picsum.photos/300/300",
  bottomImage: "https://img.logoipsum.com/300.svg",
  description: "Description",
};
