import { v4 as uuidv4 } from "uuid";

import Textarea from "@/components/Textarea/Textarea.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SUGGESTION_TYPES } from "@/dropdown-options/suggestion-types.ts";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { ComponentProps, ReactElement } from "react";

import styles from "./CreateEditForm.module.css";
import Select from "@/components/Select/Select.tsx";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import DeleteButton from "@/components/DeleteButton/DeleteButton.tsx";

type Props = {
  onSubmitClick: (newSuggestion: SuggestionModel) => void;
  titleIcon?: ReactElement<ComponentProps<"img">>;

  pageTitle: string;
  defaultValues?: SuggestionModel;
  onCancel: () => void;
  onRemove: () => void;
};

function CreateEditForm({
  onSubmitClick,
  titleIcon,
  pageTitle,
  defaultValues,
  onCancel,
  onRemove,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SuggestionModel>({
    defaultValues: defaultValues || {
      id: uuidv4(),
      title: "",
      description: "",
      suggestionType: SUGGESTION_TYPES[0].value,
      suggestionStatus: SUGGESTION_STATUS[0].value,
      rank: 0,
      comments: [],
    },
  });

  const { t } = useTranslation();

  const onSubmit = (data: SuggestionModel) => {
    onSubmitClick({ ...data });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {titleIcon}
        <h2>{pageTitle}</h2>

        <div>
          <h3>
            {t("createEditForm.feedbackTitle")}
            <span className={styles.star}> *</span>
          </h3>

          <span className={"subtitle"}>
            {t("createEditForm.titleDescription")}
          </span>

          <input
            {...register("title", {
              required: t("createEditForm.titleIsRequired"),
            })}
          />
          {errors.title && <span>{t("createEditForm.titleIsRequired")}</span>}
        </div>

        <div>
          <h3>{t("createEditForm.category")}</h3>
          <span className={"subtitle"}>
            {t("createEditForm.categoryDescription")}
          </span>

          <Controller
            name="suggestionType"
            control={control}
            render={({ field }) => (
              <>
                <Select options={SUGGESTION_TYPES} {...field}></Select>
              </>
            )}
          />
        </div>

        <div>
          <h3>{t("createEditForm.updateStatus")}</h3>
          <span className={"subtitle"}>
            {t("createEditForm.statusDescription")}
          </span>

          <Controller
            name="suggestionStatus"
            control={control}
            render={({ field }) => (
              <>
                <Select options={SUGGESTION_STATUS} {...field}></Select>
              </>
            )}
          />
        </div>

        <div>
          <h3>
            {t("createEditForm.feedbackDetail")}{" "}
            <span className={styles.star}>*</span>
          </h3>
          <span className={"subtitle"}>
            {t("createEditForm.feedbackDetailDescription")}
          </span>

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: t("createEditForm.descriptionIsRequired") }}
            render={({ field, fieldState }) => (
              <>
                <Textarea {...field} />
                {fieldState.error && <span>{fieldState.error.message}</span>}
              </>
            )}
          />
        </div>

        <div className={styles["button-container"]}>
          <Button
            className={styles.save}
            variant={Variant.SOLID}
            color={Color.PRIMARY}
          >
            {t("createEditForm.buttons.saveChanges")}
          </Button>

          <DeleteButton onDeleteClick={onRemove} />

          <Button
            type="button"
            variant={Variant.SOLID}
            color={Color.SECONDARY}
            onClick={onCancel}
          >
            {t("createEditForm.buttons.cancel")}
          </Button>
        </div>
      </form>
    </>
  );
}

export default CreateEditForm;
