import { ComponentStory, ComponentMeta } from "@storybook/react";
import IconsAroundImage, { Props } from ".";

export default {
  title: "IconsAroundImage",
  component: IconsAroundImage,
} as ComponentMeta<typeof IconsAroundImage>;

const Template: ComponentStory<typeof IconsAroundImage> = function (
  args: Props,
) {
  return <IconsAroundImage {...args} />;
};

export const Default = Template.bind({});

export const StaticIcons = Template.bind({});

Default.args = {
  imageSrc: "https://picsum.photos/200",
};

StaticIcons.args = {
  imageSrc: "https://picsum.photos/200",
  isStatic: true,
};
