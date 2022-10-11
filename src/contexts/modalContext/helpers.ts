import ModalBlank, {
  Props as ModalBlankProps,
} from "components/moleculars/modals/ModalBlank";
import ModalError, {
  Props as ModalErrorProps,
} from "components/moleculars/modals/ModalError";
import ModalForm, {
  Props as ModalFormProps,
} from "components/moleculars/modals/ModalForm";
import ModalIcon, {
  Props as ModalIconProps,
} from "components/moleculars/modals/ModalIcon";
import ModalImage, {
  Props as ModalImageProps,
} from "components/moleculars/modals/ModalImage";
import ModalRows, {
  Props as ModalRowsProps,
} from "components/moleculars/modals/ModalRows";
import ModalAnimation, {
  Props as ModalAnimationProps,
} from "components/moleculars/modals/ModalAnimation";
import ModalDoubleImage, {
  Props as ModalDoubleImageProps,
} from "components/moleculars/modals/ModalDoubleImage";

/* eslint-disable no-shadow, no-unused-vars */
export enum MODAL_TYPES {
  MODAL_BLANK = "MODAL_BLANK",
  MODAL_ERROR = "MODAL_ERROR",
  MODAL_FORM = "MODAL_FORM",
  MODAL_ICON = "MODAL_ICON",
  MODAL_IMAGE = "MODAL_IMAGE",
  MODAL_ROWS = "MODAL_ROWS",
  MODAL_ANIMATION = "MODAL_ANIMATION",
  MODAL_DOUBLE_IMAGE = "MODAL_DOUBLE_IMAGE",
}
/* eslint-enable no-shadow, no-unused-vars */

export const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.MODAL_BLANK]: ModalBlank,
  [MODAL_TYPES.MODAL_ERROR]: ModalError,
  [MODAL_TYPES.MODAL_FORM]: ModalForm,
  [MODAL_TYPES.MODAL_ICON]: ModalIcon,
  [MODAL_TYPES.MODAL_IMAGE]: ModalImage,
  [MODAL_TYPES.MODAL_ROWS]: ModalRows,
  [MODAL_TYPES.MODAL_ANIMATION]: ModalAnimation,
  [MODAL_TYPES.MODAL_DOUBLE_IMAGE]: ModalDoubleImage,
};
export type ShowModalProps =
  | {
      type: MODAL_TYPES.MODAL_BLANK;
      props: ModalBlankProps;
    }
  | {
      type: MODAL_TYPES.MODAL_ERROR;
      props: ModalErrorProps;
    }
  | {
      type: MODAL_TYPES.MODAL_FORM;
      props: ModalFormProps;
    }
  | {
      type: MODAL_TYPES.MODAL_ICON;
      props: ModalIconProps;
    }
  | {
      type: MODAL_TYPES.MODAL_IMAGE;
      props: ModalImageProps;
    }
  | {
      type: MODAL_TYPES.MODAL_ROWS;
      props: ModalRowsProps;
    }
  | {
      type: MODAL_TYPES.MODAL_ANIMATION;
      props: ModalAnimationProps;
    }
  | {
      type: MODAL_TYPES.MODAL_DOUBLE_IMAGE;
      props: ModalDoubleImageProps;
    };
