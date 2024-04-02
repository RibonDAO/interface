import { DirectUpload } from "activestorage";
import { RIBON_API } from "utils/constants";

export function useUploadFile(file: File) {
  const upload = new DirectUpload(
    file,
    `${RIBON_API}/users/v1/rails/active_storage/direct_uploads`,
  );

  return upload;
}
