import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import InputText from "components/atomics/inputs/InputText";
import CheckBox from "components/atomics/inputs/Checkbox";
import FileUpload from "components/moleculars/FileUpload";
import Button from "components/atomics/buttons/Button";
import { useAuthentication } from "contexts/authenticationContext";
import useUserIntegration from "hooks/userHooks/useUserIntegration";
import Spinner from "components/atomics/Spinner";
import { useCurrentUser } from "contexts/currentUserContext";
import theme from "styles/theme";
import { logError } from "services/crashReport";
import useToast from "hooks/useToast";
import * as S from "./styles";

interface BusinessFormObject {
  name: string;
  logo: File | undefined;
  ticketAvailabilityInMinutes: null;
  status: string;
  metadata: {
    ownerName: string;
    linkedinProfile: string;
    corporateEmail: string;
    phone: string;
    optIn: boolean;
    userId?: number;
  };
}

function CustomLinkPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "customLinkPage",
  });

  const { createUserIntegration, getUserIntegration } = useUserIntegration();

  const { currentUser } = useCurrentUser();
  const toast = useToast();

  const [logo, setLogo] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [formObject, setFormObject] = useState<BusinessFormObject>({
    name: "",
    logo: undefined,
    ticketAvailabilityInMinutes: null,
    status: "active",
    metadata: {
      ownerName: "",
      linkedinProfile: "",
      corporateEmail: "",
      phone: "",
      optIn: false,
      userId: currentUser?.id,
    },
  });

  const { isAuthenticated } = useAuthentication();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigateTo("/sign-in-custom-link");
    } else {
      getUserIntegration().then((integration) => {
        if (integration) {
          navigateTo("/custom-link-created");
        }
      });
    }
  }, []);

  const checkForEmptyFields = () => {
    const fields = Object.values(formObject);

    const filtered = fields.filter(
      (field) => field !== formObject.ticketAvailabilityInMinutes,
    );

    const hasEmpty = filtered.some(
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

  const handleSubmit = async () => {
    try {
      await createUserIntegration(formObject, logo);
      setLoading(true);
      setTimeout(() => {
        getUserIntegration().then((integration) => {
          if (integration) {
            navigateTo("/custom-link-created");
          } else {
            toast({
              message: t("onErrorMessage"),
              type: "error",
            });
          }
          setLoading(false);
        });
      }, 5000);
    } catch (error) {
      logError(error);
      toast({
        message: t("onErrorMessage"),
        type: "error",
      });
    }
  };

  useEffect(() => {
    checkForEmptyFields();
  }, [formObject]);

  return (
    <S.MainContainer>
      <S.Container>
        <S.Title>{t("title")}</S.Title>

        <S.Form>
          {loading && <S.Overlay />}
          <S.Subtitle>{t("business.companysInfo")}</S.Subtitle>
          <S.FieldSet>
            <InputText
              name="companys_name"
              label={{ text: t("business.companysName") }}
              value={formObject.name}
              onChange={(e) => setField("name", e)}
              required
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
              required
            />
            <InputText
              name="admin_linkedin"
              label={{ text: t("business.adminLinkedIn") }}
              value={formObject.metadata.linkedinProfile}
              onChange={(e) => setMetadataField("linkedinProfile", e)}
              required
            />
            <InputText
              name="admin_email"
              label={{ text: t("business.adminEmail") }}
              value={formObject.metadata.corporateEmail}
              onChange={(e) => setMetadataField("corporateEmail", e)}
              type="email"
              required
            />
            <InputText
              name="admin_phone"
              label={{ text: t("business.adminPhone") }}
              value={formObject.metadata.phone}
              onChange={(e) => setMetadataField("phone", e)}
              mask="(99) 99999-9999"
              required
            />
            <CheckBox
              text={t("business.optIn")}
              checked={formObject.metadata.optIn}
              onCheck={toggleOptIn}
            />
          </S.FieldSet>

          {loading ? (
            <S.LoaderContainer>
              <Spinner
                size="24"
                strokeColor={theme.colors.brand.primary[600]}
              />
              <p>{t("business.loading")}</p>
            </S.LoaderContainer>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              text={t("business.submit")}
              softDisabled={buttonDisabled || loading}
              disabled={buttonDisabled || loading}
              backgroundColor={theme.colors.brand.primary[600]}
              data-testid="confirmCustomLink"
            />
          )}
        </S.Form>
      </S.Container>
    </S.MainContainer>
  );
}

export default CustomLinkPage;
