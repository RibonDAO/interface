import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributionSection, { Props } from ".";

export default {
  title: "ContributionSection",
  description: "Section with contribution button",
  component: ContributionSection,
} as ComponentMeta<typeof ContributionSection>;

const Template: ComponentStory<typeof ContributionSection> = function (
  args: Props,
) {
  return (
    <div style={{ width: "600px" }}>
      <ContributionSection {...args} />
    </div>
  );
};

export const Default = Template.bind({});
