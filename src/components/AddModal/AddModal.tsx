import styles from "./AddModal.module.css";
import { FormEvent, ForwardedRef, forwardRef, useState } from "react";
import { SUGGESTION_Options } from "../../models/suggestion-options.ts";
import Button, { Color } from "../Button/Button.tsx";
import { SuggestionModel } from "../../models/suggestion.ts";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onSubmit: (newSuggestion: SuggestionModel) => void;
  onCancel: () => void;
};

function AddModal(
  { onSubmit, onCancel }: Props,
  ref: ForwardedRef<HTMLDialogElement>,
) {
  const defultValue = {
    id: uuidv4(),
    rank: 0,
    title: "",
    description: "",
    suggestionType: SUGGESTION_Options[0].value,
    comments: null,
  };

  const defaultErrors = { title: "", description: "" };

  const [fields, setFields] = useState<SuggestionModel>(defultValue);
  const [errors, setErrors] = useState(defaultErrors);

  const handleChange = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  const clearFields = () => {
    setFields(defultValue);
    setErrors(defaultErrors);
  };

  const handleValidation = (): boolean => {
    let formValidate = true;
    if (!fields.title) {
      formValidate = false;
      setErrors({ ...errors, ["title"]: "*" });
    }

    if (!fields.description) {
      formValidate = false;
      setErrors({ ...errors, ["description"]: "*" });
    }

    return formValidate;
  };

  const onSubmitClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    onSubmit(fields);
    clearFields();
  };

  const onCancelClickHandler = () => {
    clearFields();
    onCancel();
  };

  return (
    <dialog className={styles.modal} ref={ref}>
      <form onSubmit={onSubmitClickHandler}>
        <div className={styles.content}>
          <h2>New Suggestion</h2>

          <label>
            Title:
            <input
              value={fields.title}
              onChange={(e) => handleChange("title", e.currentTarget.value)}
            />
          </label>
          <span>{errors.title}</span>

          <label>
            Suggestion type:
            <select
              name="suggestionType"
              value={fields.suggestionType}
              onChange={(e) =>
                handleChange("suggestionType", e.currentTarget.value)
              }
            >
              {SUGGESTION_Options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Description:
            <textarea
              name="description"
              rows="3"
              cols="40"
              value={fields.description}
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </label>
          <span>{errors.description}</span>

          <div className={styles["button-container"]}>
            <Button color={Color.blue} type="submit">
              Submit
            </Button>
            <Button
              type="button"
              color={Color.blue}
              onClick={onCancelClickHandler}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

export default forwardRef(AddModal);
