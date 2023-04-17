import * as S from "./styles";

export type Props = {
  title: string;
  description: string;
  link1?: string;
  link2?: string;
  type: "success" | "warning" | "error" | "informational";
};
function InlineNotification({
  title,
  description,
  link1,
  link2,
  type,
}: Props): JSX.Element {
  return (
    <S.Container type={type}>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Links>
        {link1 && <S.Link href={link1}>Link 1</S.Link>}
        {link2 && <S.Link href={link2}>Link 2</S.Link>}
      </S.Links>
    </S.Container>
  );
}

export default InlineNotification;
