import ModalBlank, {
  Props as ModalBlankProps,
} from "components/moleculars/modals/ModalBlank";
import ModalForm, {
  Props as ModalFormProps,
} from "components/moleculars/modals/ModalForm";
import ModalIcon, {
  Props as ModalIconProps,
} from "components/moleculars/modals/ModalIcon";
import ModalRows, {
  Props as ModalRowsProps,
} from "components/moleculars/modals/ModalRows";
import ModalAnimation, {
  Props as ModalAnimationProps,
} from "components/moleculars/modals/ModalAnimation";
import ModalDoubleImage, {
  Props as ModalDoubleImageProps,
} from "components/moleculars/modals/ModalDoubleImage";
import ModalDialog, {
  Props as ModalDialogProps,
} from "components/moleculars/modals/ModalDialog";

/* eslint-disable no-shadow, no-unused-vars */
export enum MODAL_TYPES {
  MODAL_BLANK = "MODAL_BLANK",
  MODAL_ERROR = "MODAL_ERROR",
  MODAL_FORM = "MODAL_FORM",
  MODAL_ICON = "MODAL_ICON",
  MODAL_ROWS = "MODAL_ROWS",
  MODAL_ANIMATION = "MODAL_ANIMATION",
  MODAL_DOUBLE_IMAGE = "MODAL_DOUBLE_IMAGE",
  MODAL_DIALOG = "MODAL_DIALOG",
}
/* eslint-enable no-shadow, no-unused-vars */

export const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.MODAL_BLANK]: ModalBlank,
  [MODAL_TYPES.MODAL_FORM]: ModalForm,
  [MODAL_TYPES.MODAL_ICON]: ModalIcon,
  [MODAL_TYPES.MODAL_ROWS]: ModalRows,
  [MODAL_TYPES.MODAL_ANIMATION]: ModalAnimation,
  [MODAL_TYPES.MODAL_DOUBLE_IMAGE]: ModalDoubleImage,
  [MODAL_TYPES.MODAL_DIALOG]: ModalDialog,
};
export type ShowModalProps =
  | {
      type: MODAL_TYPES.MODAL_BLANK;
      props: ModalBlankProps;
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
    }
  | {
      type: MODAL_TYPES.MODAL_DIALOG;
      props: ModalDialogProps;
    };
