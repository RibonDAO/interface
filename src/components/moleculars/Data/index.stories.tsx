import { ComponentStory, ComponentMeta } from "@storybook/react";
import { theme } from "@ribon.io/shared/styles";
import Data, { Props } from ".";

export default {
  Data: "Data",
  component: Data,
} as ComponentMeta<typeof Data>;

const Template: ComponentStory<typeof Data> = function (args: Props) {
  return <Data {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  data: "80,000",
  label: "People engaged donating tickets",
  color: theme.colors.brand.tertiary[800],
};
