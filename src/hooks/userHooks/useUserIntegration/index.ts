import { Integration } from "@ribon.io/shared/types/entities";
import { userIntegrationsApi } from "@ribon.io/shared/services";
import { useUploadFile } from "../useUploadFile";

function useUserIntegration() {
  async function getUserIntegration() {
    const { data: integration } = await userIntegrationsApi.getIntegration();

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
