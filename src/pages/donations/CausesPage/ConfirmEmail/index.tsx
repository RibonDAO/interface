import ModalForm from "components/moleculars/modals/ModalForm";
import { useState } from "react";
import { isValidEmail } from "lib/validators";
import { useTranslation } from "react-i18next";
import * as S from "../styles";

type Props = {
  onFormSubmit: (values: Record<any, any>) => void;
  visible: boolean;
  title: string;
  icon: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonCallback: () => void;
};
function ConfirmEmail({
  onFormSubmit,
  visible,
  title,
  icon,
  primaryButtonText,
  secondaryButtonText,
  secondaryButtonCallback,
}: Props): JSX.Element {
  const [primaryButtonDisabled, setPrimaryButtonDisabled] = useState(true);
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
          <a href={t("useTermsLink")} target="_blank" rel="noreferrer">
            {t("useTermsText")}
          </a>{" "}
          {t("footerAnd")}{" "}
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
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      secondaryButtonCallback={secondaryButtonCallback}
      primaryButtonDisabled={primaryButtonDisabled}
      onValuesChange={(values) => {
        setPrimaryButtonDisabled(!isValidEmail(values.email));
      }}
      title={title}
    />
  );
}

export default ConfirmEmail;
