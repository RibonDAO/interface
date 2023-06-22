import { ComponentStory, ComponentMeta } from "@storybook/react";
import GooglePlayIcon from "assets/icons/google-pay-icon.svg";
import ApplePayIcon from "assets/icons/apple-pay-icon.svg";
import CreditCardIcon from "assets/icons/credit-card-icon.svg";
import RadioAccordion, { Props } from ".";

export default {
  title: "RadioAccordion",
  component: RadioAccordion,
} as ComponentMeta<typeof RadioAccordion>;

const Template: ComponentStory<typeof RadioAccordion> = function (args: Props) {
  return (
    <div style={{ width: 400 }}>
      <RadioAccordion {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  current: 0,
  items: [
    {
      title: "Credit Card",
      rightIcon: CreditCardIcon,
      children: <div>Shows a really cool form here =D</div>,
    },
    {
      title: "Google Play",
      rightIcon: GooglePlayIcon,
      onClick: () => {},
    },
    {
      title: "Apple Pay",
      rightIcon: ApplePayIcon,
      onClick: () => {},
    },
  ],
};
