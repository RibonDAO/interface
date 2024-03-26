import UploadIcon from "assets/icons/upload-icon.svg";
import * as S from "./styles";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labels: {
    main: string;
    uploadBox: string;
    requirements: string;
  };
};

export default function FileUpload({ onChange, value, labels }: Props) {
  const renderUploadOverlay = () => (
    <S.UploadOverlay>
      <S.InputField
        type="file"
        onChange={onChange}
        data-testid="file-upload"
        accept="image/*"
      />
      <img src={UploadIcon} alt="Upload" />
    </S.UploadOverlay>
  );

  return (
    <S.Container>
      <S.LabelContainer>
        <S.Label>{labels.main}</S.Label>
      </S.LabelContainer>
      <S.Box>
        {value ? (
          <S.Logo src={value} alt="Company Logo" />
        ) : (
          <>
            <img src={UploadIcon} alt="Upload" />
            <S.Description>{labels.uploadBox}</S.Description>
          </>
        )}
        {renderUploadOverlay()}
      </S.Box>
      <S.Hint>{labels.requirements}</S.Hint>
    </S.Container>
  );
}
