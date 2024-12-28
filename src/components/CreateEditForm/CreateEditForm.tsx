import { ComponentProps, FormEvent, ReactElement, useState } from "react";

import styles from "./CreateEditForm.module.css";
import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";
import { SUGGESTION_STATUS } from "@/suggestion-status/suggestion-status.ts";
import Textarea from "@/components/Textarea/Textarea.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { SuggestionModel } from "@/models/suggestion-model.ts";
import { v4 as uuidv4 } from "uuid";

type Props = {
  pageTitle: string;
  onSubmit: (fields: SuggestionModel) => void;
  onCancel: () => void;
  titleIcon?: ReactElement<ComponentProps<"img">> | null;
};

const suggestion = {
  id: uuidv4(),
  title: "",
  description: "",
  suggestionType: SUGGESTION_OPTIONS[0].value,
  rank: 0,
};

export default function CreateEditFormComponent({
  pageTitle,
  onSubmit,
  onCancel,
  titleIcon = null,
}: Props): ReactElement {
  const [fields, setFields] = useState<SuggestionModel>(suggestion);

  const defaultErrors = { title: "", description: "" };
  const [errors, setErrors] = useState(defaultErrors);

  const handleChange = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  const requiredValidator = (value: string, errorFieldName: string) => {
    if (!value) {
      setErrors((old) => ({
        ...old,
        [errorFieldName]: "Fill the " + errorFieldName + " field",
      }));
    } else {
      setErrors((old) => ({ ...old, [errorFieldName]: "" }));
    }
  };

  const handleValidation = (): boolean => {
    requiredValidator(fields.title, "title");
    requiredValidator(fields.description, "description");

    if (!fields.title || !fields.description) {
      return false;
    }
    return true;
  };

  const onSubmitClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    onSubmit(fields);
  };

  return (
    <form
      className={styles["create-edit-form"]}
      onSubmit={onSubmitClickHandler}
    >
      {titleIcon}
      <h2>{pageTitle}</h2>

      <div>
        <h3>
          Feedback Title <span className={styles.star}> *</span>
        </h3>
        <span className={"subtitle"}>Add a short, descriptive headline</span>
        <input
          className={errors.title && styles.error}
          value={fields.title}
          onChange={(e) => handleChange("title", e.currentTarget.value)}
        />
        {errors.title && <span>{errors.title}</span>}
      </div>

      <div>
        <h3>Category</h3>
        <span className={"subtitle"}>Choose a category for your feedback</span>
        <select
          name="suggestionType"
          value={fields.suggestionType}
          onChange={(e) =>
            handleChange("suggestionType", e.currentTarget.value)
          }
        >
          {SUGGESTION_OPTIONS.map((option) => (
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
          className={errors.description && styles.error}
          value={fields.description}
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
          name="description"
        ></Textarea>
        {errors.description && <span>{errors.description}</span>}
      </div>

      <div className={styles["button-container"]}>
        <Button variant={Variant.PRIMARY} color={Color.PURPLE}>
          Submit
        </Button>
        <Button
          type="button"
          variant={Variant.PRIMARY}
          color={Color.DARKBLUE}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
