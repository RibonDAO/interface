import ReactModal from "react-modal";
import Stories from "react-insta-stories";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  stories: Array<any>;
  customStyles?: ReactModal.Styles;
  onAllStoriesEnd?: () => void;
};
function ModalStories({
  visible = false,
  stories,
  customStyles = defaultCustomStyles,
  onAllStoriesEnd,
}: Props): JSX.Element {
  return (
    <S.ModalWithStories
      isOpen={visible}
      style={customStyles || defaultCustomStyles}
      ariaHideApp={false}
    >
      <S.Container>
        <Stories
          loop
          keyboardNavigation
          stories={stories}
          defaultInterval={3000}
          onAllStoriesEnd={onAllStoriesEnd}
          storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
        />
      </S.Container>
    </S.ModalWithStories>
  );
}

export default ModalStories;
