import { ComponentStory, ComponentMeta } from "@storybook/react";
import GroupButtons, { Props } from ".";

export default {
  title: "GroupButtons",
  component: GroupButtons,
} as ComponentMeta<typeof GroupButtons>;

const Template: ComponentStory<typeof GroupButtons> = function (args: Props) {
  return <GroupButtons {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  nameExtractor: (element: any) => element,
  elements: ["Element 1", "Element 2", "Element 3"],
  onChange: () => {},
};
