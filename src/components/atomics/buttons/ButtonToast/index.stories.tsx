import { ComponentStory, ComponentMeta } from "@storybook/react";
import DownloadIcon from "assets/icons/download-app-icon-orange.svg";
import ButtonToast, { Props } from ".";

export default {
  title: "ButtonToast",
  component: ButtonToast,
} as ComponentMeta<typeof ButtonToast>;

const Template: ComponentStory<typeof ButtonToast> = function (args: Props) {
  return <ButtonToast {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "Baixar aplicativo",
  onClick: () => {},
  leftIcon: DownloadIcon,
};
