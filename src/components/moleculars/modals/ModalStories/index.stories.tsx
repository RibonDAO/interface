import { ComponentStory, ComponentMeta } from "@storybook/react";
import ModalStories, { Props } from ".";

export default {
  title: "ModalStories",
  component: ModalStories,
} as ComponentMeta<typeof ModalStories>;

const Template: ComponentStory<typeof ModalStories> = function (args: Props) {
  return <ModalStories {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  stories: [
    {
      url: "https://picsum.photos/720/1280",
    },
    {
      url: "https://picsum.photos/720/1280",
    },
  ],
  visible: true,
};
