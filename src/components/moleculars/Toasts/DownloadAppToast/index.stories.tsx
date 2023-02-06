import { ComponentStory, ComponentMeta } from "@storybook/react";
import DownloadAppToast from ".";

export default {
  title: "DownloadAppToast",
  component: DownloadAppToast,
} as ComponentMeta<typeof DownloadAppToast>;

const Template: ComponentStory<typeof DownloadAppToast> = function () {
  return <DownloadAppToast />;
};

export const Default = Template.bind({});
