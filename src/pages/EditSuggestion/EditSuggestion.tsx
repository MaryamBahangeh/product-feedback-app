import { useContext, useMemo } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";

import styles from "./EditSuggestion.module.css";
import { useNavigate, useParams } from "react-router";
import CreateEditFormComponent from "@/components/CreateEditForm/CreateEditForm.tsx";
import { SuggestionModel } from "@/models/suggestion-model.ts";

function EditSuggestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { suggestions, editSuggestion } = useContext(SuggestionContext);

  const suggestion = useMemo(() => {
    return suggestions.find((x) => x.id === id);
  }, [id, suggestions]);

  const goBackHandler = (): void => {
    navigate(`/suggestion-comments/${id}}`);
  };

  const submitHandler = (fields: SuggestionModel): void => {
    editSuggestion(id!, fields);
    goBackHandler();
  };

  if (!id || !suggestion) {
    navigate("/not-found");
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.content}>
      <PageHeader onGoBack={goBackHandler} />
      <CreateEditFormComponent
        pageTitle={`Editing '${suggestion.title}'`}
        titleIcon={
          <img src="/images/icones/shared/icon-edit-feedback.svg" alt="" />
        }
        onSubmit={submitHandler}
        onCancel={goBackHandler}
      />
    </div>
  );
}

export default EditSuggestion;
