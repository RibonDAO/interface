import { ComponentStory, ComponentMeta } from "@storybook/react";
import ModalWrongEmail, { Props } from ".";

export default {
  title: "ModalWrongEmail",
  component: ModalWrongEmail,
} as ComponentMeta<typeof ModalWrongEmail>;

const Template: ComponentStory<typeof ModalWrongEmail> = function (
  args: Props,
) {
  return <ModalWrongEmail {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  visible: true,
  setVisible: () => {},
};
