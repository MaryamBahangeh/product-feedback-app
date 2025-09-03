import { useRef } from "react";

import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import { useTranslation } from "react-i18next";

type Props = {
  onDeleteClick: () => void;
};

function DeleteButton({ onDeleteClick }: Props) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const { t } = useTranslation();
  return (
    <>
      {" "}
      <Button
        variant={Variant.SOLID}
        color={Color.DANGER}
        onClick={() => dialog.current?.showModal()}
        type="button"
      >
        {t("createEditForm.buttons.delete")}
      </Button>
      <Modal
        ref={dialog}
        onOkDeleteClick={onDeleteClick}
        onCancelDeleteClick={() => dialog.current?.close()}
      />
    </>
  );
}

export default DeleteButton;
