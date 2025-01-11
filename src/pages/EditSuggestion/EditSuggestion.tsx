import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./EditSuggestion.module.css";

function EditSuggestion() {
  const { suggestions, editSuggestion } = useContext(SuggestionContext);
  const { id } = useParams();

  const suggestion = useMemo(() => {
    return suggestions.find((x) => x.id === id);
  }, [id, suggestions]);

  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/suggestion-comments/" + id);
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel) => {
    editSuggestion(id!, newSuggestion);

    goBackHandler();
  };

  useEffect(() => {
    if (!id || !suggestion) {
      navigate("/");
    }
  }, []);

  if (!id || !suggestion) {
    return <div>Redirecting....</div>;
  }

  return (
    <div className={styles.content}>
      <PageHeader onGoBack={goBackHandler} />

      {suggestion && (
        <CreateEditForm
          onSubmitClick={SubmitClickHandler}
          titleIcon={
            <img src="/images/icones/shared/icon-edit-feedback.svg" alt="" />
          }
          pageTitle={`Editing '${suggestion.title}'`}
          defaultValues={suggestion}
          onCancelClick={goBackHandler}
        ></CreateEditForm>
      )}
    </div>
  );
}

export default EditSuggestion;
