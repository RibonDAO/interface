import { ComponentStory, ComponentMeta } from "@storybook/react";
import icon from "assets/images/newspaper.svg";
import Loader from "components/atomics/Loader";
import ModalRows, { Props } from ".";

export default {
  title: "ModalRows",
  component: ModalRows,
} as ComponentMeta<typeof ModalRows>;

const Template: ComponentStory<typeof ModalRows> = function (args: Props) {
  return <ModalRows {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "ModalRows",
  body: "Subtitle",
  visible: true,
  icon,
  primaryButtonText: "Primary",
  secondaryButtonText: "Secondary",
  rowsContent: [
    {
      id: 1,
      icon,
      text: "dunaaa",
    },
  ],
  children: [<Loader />],
};
