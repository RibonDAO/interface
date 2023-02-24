import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputText from "components/atomics/inputs/InputText";
import Form, { Props } from ".";

export default {
  children: "InputText",
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = function (args: Props) {
  return <Form {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <InputText name="texto" placeholder="placeholder" />
      <InputText name="texto" placeholder="placeholder" />
    </>
  ),
  borderColor: { default: "#eb19c3", active: "#eb19c3" },
  textColor: "#eb19c3",
};
