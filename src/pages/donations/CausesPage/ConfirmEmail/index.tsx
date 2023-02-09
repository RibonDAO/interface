import ModalForm from "components/moleculars/modals/ModalForm";
import { useState } from "react";
import { isValidEmail } from "lib/validators";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "components/atomics/buttons/Button";
import { newLogEvent } from "lib/events";
import * as S from "../styles";

type Props = {
  onFormSubmit: (values: Record<any, any>) => void;
  visible: boolean;
  title: string;
  icon: string;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
};
function ConfirmEmail({
  onFormSubmit,
  visible,
  title,
  icon,
  primaryButton,
  secondaryButton,
}: Props): JSX.Element {
  const [primaryButtonDisabled, setPrimaryButtonDisabled] = useState(true);
  const [logged, setLogged] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.modalForm",
  });

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "E-mail",
      id: "email",
      required: true,
    },
  ];
  const initialState = {
    email: "",
  };

  function footer() {
    return (
      <div>
        <S.FooterText>
          {t("footerStartText")}{" "}
          <a href={t("privacyPolicyLink")} target="_blank" rel="noreferrer">
            {t("privacyPolicyText")}
          </a>
        </S.FooterText>
      </div>
    );
  }

  return (
    <ModalForm
      formFields={fields}
      initialState={initialState}
      onFormSubmit={onFormSubmit}
      visible={visible}
      footer={footer()}
      icon={icon}
      primaryButton={{
        text: primaryButton.text,
        onClick: primaryButton.onClick,
        disabled: primaryButtonDisabled,
        eventName: "P1_loginConfirmBtn",
      }}
      secondaryButton={{
        text: secondaryButton.text,
        onClick: secondaryButton.onClick,
      }}
      onValuesChange={(values) => {
        if (values.email) {
          if (!logged) {
            newLogEvent("fill", "P1_loginForm");
            setLogged(true);
          }
        }
        setPrimaryButtonDisabled(!isValidEmail(values.email));
      }}
      title={title}
      eventName="P1_loginModal"
    />
  );
}

export default ConfirmEmail;
