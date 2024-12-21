import { FormEvent, useContext, useState } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import Textarea from "@/components/Textarea/Textarea.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";

import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";
import { SUGGESTION_STATUS } from "@/suggestion-status/suggestion-status.ts";

import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";

import styles from "./EditSuggestion.module.css";

type Props = {
  suggestion: SuggestionModel;
  isEditing: boolean;
};

function EditSuggestion({ suggestion, isEditing }: Props) {
  const { addSuggestion, editSuggestion } = useContext(SuggestionContext);
  const { setPage, setParams } = useContext(RoutingContext);

  const [fields, setFields] = useState<SuggestionModel>(suggestion);

  const defaultErrors = { title: "", description: "" };
  const [errors, setErrors] = useState(defaultErrors);

  const pageTitle = isEditing
    ? `Editing '${suggestion.title}'`
    : `Add a new suggestion`;

  const handleChange = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  const handleValidation = (): boolean => {
    if (!fields.title) {
      setErrors({ ...errors, ["title"]: "*" });
      return false;
    }

    if (!fields.description) {
      setErrors({ ...errors, ["description"]: "*" });
      return false;
    }
    return true;
  };

  const goBackHandler = () => {
    if (!isEditing) {
      setPage("home");
    } else {
      setPage("suggestion-comments");
      setParams({ suggestionId: suggestion.id });
    }
  };

  const onSubmitClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    if (!isEditing) {
      addSuggestion(fields);
    } else {
      editSuggestion(suggestion.id, fields);
    }
    goBackHandler();
  };

  return (
    <div className={styles.content}>
      <PageHeader onGoBack={goBackHandler}></PageHeader>

      <form onSubmit={onSubmitClickHandler}>
        {isEditing && (
          <img src="/images/icones/shared/icon-edit-feedback.svg" alt="" />
        )}
        <h2>{pageTitle}</h2>

        <div>
          <h3>Feedback Title</h3>
          <span className={"subtitle"}>Add a short, descriptive headline</span>
          <input
            value={fields.title}
            onChange={(e) => handleChange("title", e.currentTarget.value)}
          />
          {errors.title && <span>{errors.title}</span>}
        </div>

        <div>
          <h3>Category</h3>
          <span className={"subtitle"}>
            Choose a category for your feedback
          </span>
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
          <h3>Feedback Detail</h3>
          <span className={"subtitle"}>
            Include any specific comments on what should be improved, added,
            etc.
          </span>
          <Textarea
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
            onClick={goBackHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditSuggestion;
