import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import InputText from "components/atomics/inputs/InputText";
import CheckBox from "components/atomics/inputs/Checkbox";
import FileUpload from "components/moleculars/FileUpload";
import Button from "components/atomics/buttons/Button";
import { useAuthentication } from "contexts/authenticationContext";
import theme from "styles/theme";
import * as S from "./styles";

interface BusinessFormObject {
  name: string;
  logo: File | undefined;
  active: boolean;
  metadata: {
    ownerName: string;
    linkedinProfile: string;
    corporateEmail: string;
    phone: string;
    optIn: boolean;
  };
}

function CustomLinkPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "customLinkPage",
  });

  const { isAuthenticated } = useAuthentication();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigateTo("/sign-in-custom-link");
    }
  }, []);

  const [logo, setLogo] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [formObject, setFormObject] = useState<BusinessFormObject>({
    name: "",
    logo: undefined,
    active: true,
    metadata: {
      ownerName: "",
      linkedinProfile: "",
      corporateEmail: "",
      phone: "",
      optIn: false,
    },
  });

  const checkForEmptyFields = () => {
    const fields = Object.values(formObject);
    const hasEmpty = fields.some(
      (field) => field === "" || field === undefined || field === null,
    );

    setButtonDisabled(hasEmpty || !formObject.metadata.optIn);
  };

  const setField = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormObject({ ...formObject, [field]: value });
  };

  const setMetadataField = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setFormObject({
      ...formObject,
      metadata: { ...formObject.metadata, [field]: value },
    });
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const logoFile = e.target.files![0];
    setLogo(URL.createObjectURL(logoFile));
    setFormObject({ ...formObject, logo: logoFile as File });
  };

  const toggleOptIn = () => {
    setFormObject({
      ...formObject,
      metadata: { ...formObject.metadata, optIn: !formObject.metadata.optIn },
    });
  };

  const handleSubmit = () => {
    // console.log(formObject);
  };

  useEffect(() => {
    checkForEmptyFields();
  }, [formObject]);

  return (
    <S.MainContainer>
      <S.Container>
        <S.Title>{t("title")}</S.Title>

        <S.Form>
          <S.Subtitle>{t("business.companysInfo")}</S.Subtitle>
          <S.FieldSet>
            <InputText
              name="companys_name"
              label={{ text: t("business.companysName") }}
              value={formObject.name}
              onChange={(e) => setField("name", e)}
            />
            <FileUpload
              onChange={handleMainImageChange}
              value={logo}
              labels={{
                main: t("business.companysLogo"),
                uploadBox: t("business.uploadLogoDescription"),
                requirements: t("business.uploadMaxSize"),
              }}
            />
          </S.FieldSet>

          <S.Subtitle>{t("business.adminInfo")}</S.Subtitle>
          <S.FieldSet>
            <InputText
              name="admin_name"
              label={{ text: t("business.adminName") }}
              value={formObject.metadata.ownerName}
              onChange={(e) => setMetadataField("ownerName", e)}
            />
            <InputText
              name="admin_linkedin"
              label={{ text: t("business.adminLinkedIn") }}
              value={formObject.metadata.linkedinProfile}
              onChange={(e) => setMetadataField("linkedinProfile", e)}
            />
            <InputText
              name="admin_email"
              label={{ text: t("business.adminEmail") }}
              value={formObject.metadata.corporateEmail}
              onChange={(e) => setMetadataField("corporateEmail", e)}
            />
            <InputText
              name="admin_phone"
              label={{ text: t("business.adminPhone") }}
              value={formObject.metadata.phone}
              onChange={(e) => setMetadataField("phone", e)}
            />
            <CheckBox
              text={t("business.optIn")}
              checked={formObject.metadata.optIn}
              onCheck={toggleOptIn}
            />
          </S.FieldSet>

          <Button
            type="button"
            onClick={handleSubmit}
            text={t("business.submit")}
            softDisabled={buttonDisabled}
            disabled={buttonDisabled}
            backgroundColor={theme.colors.brand.primary[600]}
            data-testid="confirmCustomLink"
          />
        </S.Form>
      </S.Container>
    </S.MainContainer>
  );
}

export default CustomLinkPage;
