import { ComponentStory, ComponentMeta } from "@storybook/react";
import GlobeIcon from "assets/icons/globe-icon.svg";
import Button from "components/atomics/buttons/Button";
import CardDoubleText, { Props } from ".";

export default {
  title: "CardDoubleText",
  component: CardDoubleText,
} as ComponentMeta<typeof CardDoubleText>;

const Template: ComponentStory<typeof CardDoubleText> = function (args: Props) {
  return (
    <div style={{ width: "328px" }}>
      <CardDoubleText {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: "15/01/12",
  subtitle: "12 alunos",
  icon: GlobeIcon,
  rightComponent: <Button text="text" onClick={() => {}} />,
};
