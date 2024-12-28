import { ComponentProps, FormEvent, ReactElement, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import styles from "./CreateEditForm.module.css";
import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";
import { SUGGESTION_STATUS } from "@/suggestion-status/suggestion-status.ts";
import Textarea from "@/components/Textarea/Textarea.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { SuggestionModel } from "@/models/suggestion-model.ts";

type Props = {
  pageTitle: string;
  onSubmit: (fields: SuggestionModel) => void;
  onCancel: () => void;
  defaultValues?: Partial<SuggestionModel>;
  titleIcon?: ReactElement<ComponentProps<"img">> | null;
};

export default function CreateEditFormComponent({
  pageTitle,
  onSubmit,
  onCancel,
  defaultValues,
  titleIcon = null,
}: Props): ReactElement {
  const [fields, setFields] = useState<SuggestionModel>({
    id: uuidv4(),
    title: "",
    description: "",
    suggestionType: SUGGESTION_OPTIONS[0].value,
    rank: 0,
    ...defaultValues,
  });

  const handleChange = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  const onSubmitClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          value={fields.title}
          required
          onChange={(e) => handleChange("title", e.currentTarget.value)}
        />
        <span className={styles["error-message"]}>Title is required.</span>
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
          value={fields.description}
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
