import { FormEvent, useContext, useState } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import Textarea from "@/components/Textarea/Textarea.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";

import { SUGGESTION_OPTIONS } from "@/suggestion-options/suggestion-options.ts";
import { SUGGESTION_STATUS } from "@/suggestion-status/suggestion-status.ts";

import { useParams } from "react-router";
import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./EditSuggestion.module.css";
import { v4 as uuidv4 } from "uuid";

function EditSuggestion() {
  const { addSuggestion, editSuggestion } = useContext(SuggestionContext);
  const { setPage, setParams } = useContext(RoutingContext);

  const { isEditing } = useParams();
  const suggestion = {
    id: uuidv4(),
    title: "",
    description: "",
    suggestionType: SUGGESTION_OPTIONS[0].value,
    rank: 0,
  };
  const [fields, setFields] = useState<SuggestionModel>(
    suggestion as SuggestionModel,
  );

  const defaultErrors = { title: "", description: "" };
  const [errors, setErrors] = useState(defaultErrors);

  let pageTitle = isEditing
    ? `Editing '${suggestion.title}'`
    : `Add a new suggestion`;

  console.log(isEditing);
  if (!isEditing) {
    console.log("kjhsdjkfhjshde");
    pageTitle = "Add a new suggestion";
  }

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
          <h3>
            Feedback Detail <span className={styles.star}>*</span>
          </h3>

          <span className={"subtitle"}>
            Include any specific comments on what should be improved, added,
            etc.
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
