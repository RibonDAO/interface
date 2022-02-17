import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardRoundImage, { Props } from ".";

export default {
  title: "CardRoundImage",
  component: CardRoundImage,
} as ComponentMeta<typeof CardRoundImage>;

const Template: ComponentStory<typeof CardRoundImage> = function (args: Props) {
  return <CardRoundImage {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  image: "https://i.imgur.com/XcuQwoJ.png0",
  logo: "https://i.imgur.com/5oJSpVO.png",
};
