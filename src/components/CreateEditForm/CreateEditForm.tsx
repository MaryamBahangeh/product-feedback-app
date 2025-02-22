import { ComponentProps, FormEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import Textarea from "@/components/Textarea/Textarea.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import Select from "@/components/Select/Select.tsx";

import { SUGGESTION_TYPES } from "@/dropdown-options/suggestion-options.ts";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./CreateEditForm.module.css";

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
  const [newSuggestion, setNewSuggestion] = useState<SuggestionModel>({
    id: uuidv4(),
    title: "",
    description: "",
    suggestionType: SUGGESTION_TYPES[0].value,
    rank: 0,
    comments: [],
    ...defaultValues,
  });

  const handleChange = (field: string, value: string) => {
    setNewSuggestion({ ...newSuggestion, [field]: value });
  };

  const SubmitClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitClick(newSuggestion);
  };

  const { t } = useTranslation();

  return (
    <form className={styles.form} onSubmit={SubmitClickHandler}>
      {titleIcon}
      <h2>{pageTitle}</h2>

      <div>
        <h3>
          {t("createEditForm.feedbackTitle")}{" "}
          <span className={styles.star}> *</span>
        </h3>
        <span className={"subtitle"}>
          {t("createEditForm.titleDescription")}
        </span>
        <input
          value={newSuggestion.title}
          onChange={(e) => handleChange("title", e.currentTarget.value)}
          required
        />
        <span className={styles["error-message"]}>
          {t("createEditForm.titleIsRequired")}
        </span>
      </div>

      <div>
        <h3>{t("createEditForm.category")}</h3>
        <span className={"subtitle"}>
          {t("createEditForm.categoryDescription")}
        </span>
        <Select
          name="suggestionType"
          options={SUGGESTION_TYPES}
          value={newSuggestion.suggestionType}
          onChange={(e) =>
            handleChange("suggestionType", e.currentTarget.value)
          }
        ></Select>
      </div>

      <div>
        <h3>{t("createEditForm.updateStatus")}</h3>
        <span className={"subtitle"}>
          {t("createEditForm.statusDescription")}
        </span>
        <Select
          name="suggestionStatus"
          options={SUGGESTION_STATUS}
          defaultValue={SUGGESTION_STATUS[0].value}
          onChange={(e) =>
            handleChange("suggestionStatus", e.currentTarget.value)
          }
        ></Select>
      </div>

      <div>
        <h3>
          {t("createEditForm.feedbackDetail")}{" "}
          <span className={styles.star}>*</span>
        </h3>

        <span className={"subtitle"}>
          {t("createEditForm.feedbackDetailDescription")}
        </span>
        <Textarea
          value={newSuggestion.description}
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
          name="description"
          required
        ></Textarea>
        <span className={styles["error-message"]}>
          {t("createEditForm.descriptionIsRequired.")}
        </span>
      </div>

      <div className={styles["button-container"]}>
        <Button
          variant={Variant.SOLID}
          color={Color.DANGER}
          className={styles.delete}
          onClick={onRemove}
        >
          {t("createEditForm.buttons.delete")}
        </Button>

        <Button
          type="button"
          variant={Variant.SOLID}
          color={Color.SECONDARY}
          onClick={onCancel}
        >
          {t("createEditForm.buttons.cancel")}
        </Button>

        <Button variant={Variant.SOLID} color={Color.PRIMARY}>
          {t("createEditForm.buttons.saveChanges")}
        </Button>
      </div>
    </form>
  );
}

export default CreateEditForm;
