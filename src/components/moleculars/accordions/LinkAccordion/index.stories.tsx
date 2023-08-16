import { ComponentStory, ComponentMeta } from "@storybook/react";
import LinkAccordion, { Props } from ".";

export default {
  title: "LinkAccordion",
  component: LinkAccordion,
} as ComponentMeta<typeof LinkAccordion>;

const Template: ComponentStory<typeof LinkAccordion> = function (args: Props) {
  return <LinkAccordion {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      title: "Contribuir mensalmente",
      leftIcon: "event_repeat",
      handleClick: () => {},
    },
    {
      title: "Contribuir uma  vez",
      leftIcon: "event_available",
      handleClick: () => {},
    },
  ],
};
