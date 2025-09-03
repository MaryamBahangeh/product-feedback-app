import { ForwardedRef, forwardRef, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import styles from "./Modal.module.css";

type props = {
  onCancelDeleteClick?: () => void;
  onOkDeleteClick?: () => void;
};

function Modal(
  { onCancelDeleteClick, onOkDeleteClick }: props,
  ref: ForwardedRef<HTMLDialogElement>,
): ReactElement {
  const { t } = useTranslation();

  return (
    <dialog className={styles.modal} ref={ref}>
      <p>{t("suggestionPage.confirmDelete")}</p>
      <div className={styles.actions}>
        <Button
          type="button"
          variant={Variant.SOLID}
          color={Color.DANGER}
          onClick={onOkDeleteClick}
        >
          {t("createEditForm.buttons.delete")}
        </Button>
        <Button
          type="button"
          variant={Variant.SOLID}
          color={Color.SECONDARY}
          onClick={onCancelDeleteClick}
        >
          {t("createEditForm.buttons.cancel")}
        </Button>
      </div>
    </dialog>
  );
}

export default forwardRef(Modal);
