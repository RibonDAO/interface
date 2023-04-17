import { ComponentStory, ComponentMeta } from "@storybook/react";
import InlineNotification, { Props } from ".";

export default {
  title: "InlineNotification",
  component: InlineNotification,
} as ComponentMeta<typeof InlineNotification>;

const Template: ComponentStory<typeof InlineNotification> = function (
  args: Props,
) {
  return <InlineNotification {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Title",
  description: "Description",
  link1: "Link 1",
  link2: "Link 2",
  type: "success",
};
