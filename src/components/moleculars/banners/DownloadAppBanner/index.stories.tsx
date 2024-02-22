import { ComponentStory, ComponentMeta } from "@storybook/react";
import DownloadAppBanner from ".";

export default {
  title: "DownloadAppBanner",
  component: DownloadAppBanner,
} as ComponentMeta<typeof DownloadAppBanner>;

const Template: ComponentStory<typeof DownloadAppBanner> = function () {
  return <DownloadAppBanner />;
};

export const Default = Template.bind({});
