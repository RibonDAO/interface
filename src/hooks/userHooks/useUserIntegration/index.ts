import { Integration } from "@ribon.io/shared/types/entities";
import { userIntegrationsApi } from "@ribon.io/shared/services";
import { useUploadFile } from "../useUploadFile";

type Branch = "partners" | "referral";

function useUserIntegration() {
  async function getUserIntegration(branch: Branch) {
    const { data: integration } = await userIntegrationsApi.getIntegration(
      branch as string,
    );

    return integration;
  }

  async function createUserIntegration(data: Integration, file: string) {
    const upload = useUploadFile(data.logo);

    let integration;

    if (file) {
      upload.create((error: Error, blob: any) => {
        if (error) {
          throw error;
        } else {
          integration = userIntegrationsApi.createIntegration({
            ...data,
            logo: blob.signed_id,
          });
        }
      });
    } else {
      integration = userIntegrationsApi.createIntegration(data);
    }
    return integration;
  }

  return {
    getUserIntegration,
    createUserIntegration,
  };
}

export default useUserIntegration;
