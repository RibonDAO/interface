import { ComponentStory, ComponentMeta } from "@storybook/react";
import GlobeIcon from "assets/icons/globe-icon.svg";
import Button from "components/atomics/buttons/Button";
import CardIconText, { Props } from ".";

export default {
  title: "CardIconText",
  component: CardIconText,
} as ComponentMeta<typeof CardIconText>;

const Template: ComponentStory<typeof CardIconText> = function (args: Props) {
  return (
    <div style={{ width: "328px" }}>
      <CardIconText {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  text: "Change language",
  icon: GlobeIcon,
  rightComponent: <Button text="text" onClick={() => {}} />,
};
