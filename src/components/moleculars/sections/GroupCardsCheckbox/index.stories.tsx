import { ComponentStory, ComponentMeta } from "@storybook/react";
import GroupCardsCheckbox, { Props } from ".";

export default {
  title: "GroupCardsCheckbox",
  component: GroupCardsCheckbox,
} as ComponentMeta<typeof GroupCardsCheckbox>;

const Template: ComponentStory<typeof GroupCardsCheckbox> = function (
  args: Props,
) {
  return <GroupCardsCheckbox {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  elements: [
    {
      firstDescription: "firstDescription",
      firstIconName: "confirmation_number",
      secondDescription: "secondDescription",
      secondIconName: "box",
      value: "R$12,45",
      recurrence: "month",
    },
    {
      firstDescription: "firstDescription",
      firstIconName: "confirmation_number",
      secondDescription: "secondDescription",
      secondIconName: "box",
      value: "R$12,45",
      recurrence: "month",
      tagText: "Most popular",
    },
  ],
};
