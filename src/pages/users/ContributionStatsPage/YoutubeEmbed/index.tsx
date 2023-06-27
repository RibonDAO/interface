import * as S from './styles';

type Props = {
  embedId: string;
  title?: string;
};

function YoutubeEmbed({
  embedId,
  title,
}: Props): JSX.Element {
  return (
  <S.Container>
    { title && <S.Title>{title}</S.Title> }
    <S.IframeContainer>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
        title="Embedded youtube"
      />
    </S.IframeContainer>
  </S.Container>)
}

export default YoutubeEmbed;