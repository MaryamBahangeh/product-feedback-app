import { v4 as uuidv4 } from "uuid";

import Textarea from "@/components/Textarea/Textarea.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SUGGESTION_TYPES } from "@/suggestion-options/suggestion-options.ts";
import { SUGGESTION_STATUS } from "@/suggestion-status/suggestion-status.ts";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { ComponentProps, FormEvent, ReactElement, useState } from "react";

import styles from "./CreateEditForm.module.css";

type Props = {
  onSubmitClick: (newSuggestion: SuggestionModel) => void;
  titleIcon?: ReactElement<ComponentProps<"img">>;

  pageTitle: string;
  defaultValues?: SuggestionModel;
  onCancelClick: () => void;
};

function CreateEditForm({
  onSubmitClick,
  titleIcon,
  pageTitle,
  defaultValues,
  onCancelClick,
}: Props) {
  const [newSuggestion, setNewSuggestion] = useState<SuggestionModel>({
    id: uuidv4(),
    title: "",
    description: "",
    suggestionType: SUGGESTION_TYPES[0].value,
    rank: 0,
    ...defaultValues,
  });

  const handleChange = (field: string, value: string) => {
    setNewSuggestion({ ...newSuggestion, [field]: value });
  };

  const SubmitClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitClick(newSuggestion);
  };

  return (
    <form className={styles.form} onSubmit={SubmitClickHandler}>
      {titleIcon}
      <h2>{pageTitle}</h2>

      <div>
        <h3>
          Feedback Title <span className={styles.star}> *</span>
        </h3>
        <span className={"subtitle"}>Add a short, descriptive headline</span>
        <input
          value={newSuggestion.title}
          onChange={(e) => handleChange("title", e.currentTarget.value)}
          required
        />
        <span className={styles["error-message"]}>Title is required.</span>
      </div>

      <div>
        <h3>Category</h3>
        <span className={"subtitle"}>Choose a category for your feedback</span>
        <select
          name="suggestionType"
          value={newSuggestion.suggestionType}
          onChange={(e) =>
            handleChange("suggestionType", e.currentTarget.value)
          }
        >
          {SUGGESTION_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Update Status</h3>
        <span className={"subtitle"}>Change feature state</span>
        <select name="suggestionStatus">
          {SUGGESTION_STATUS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>
          Feedback Detail <span className={styles.star}>*</span>
        </h3>

        <span className={"subtitle"}>
          Include any specific comments on what should be improved, added, etc.
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
          Description is required.
        </span>
      </div>

      <div className={styles["button-container"]}>
        <Button
          variant={Variant.PRIMARY}
          color={Color.RED}
          className={styles.delete}
        >
          Delete
        </Button>

        <Button
          type="button"
          variant={Variant.PRIMARY}
          color={Color.DARKBLUE}
          onClick={onCancelClick}
        >
          Cancel
        </Button>

        <Button variant={Variant.PRIMARY} color={Color.PURPLE}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default CreateEditForm;
