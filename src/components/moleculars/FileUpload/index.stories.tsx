import { ComponentStory, ComponentMeta } from "@storybook/react";
import FileUpload, { Props } from ".";

export default {
  title: "FileUpload",
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = function (args: Props) {
  return <FileUpload {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  onChange: () => {},
  value: "https://picsum.photos/id/237/200/300",
  labels: {
    main: "Image",
    uploadBox: "Click here to upload your image",
    requirements: "Max size: 5MB",
  },
};
