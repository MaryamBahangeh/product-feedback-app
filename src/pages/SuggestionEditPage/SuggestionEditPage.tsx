import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionEditPage.module.css";
import { useSuggestionStore } from "@/stores/useSuggestionStore.ts";

function SuggestionEditPage() {
  const { suggestions, editSuggestion, removeSuggestion } =
    useSuggestionStore();

  const { t } = useTranslation();

  const { id } = useParams();

  const suggestion = useMemo(() => {
    return suggestions.find((x) => x.id === id);
  }, [id, suggestions]);

  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/suggestion/" + id);
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel): void => {
    editSuggestion(newSuggestion!, id!);

    goBackHandler();
  };

  const removeClickHandler = (): void => {
    removeSuggestion(suggestion!.id);
    navigate("/");
  };

  useEffect(() => {
    if (!id || !suggestion) {
      navigate("/");
    }
  }, []);

  if (!id || !suggestion) {
    return <div>{t("common.redirecting")}</div>;
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
          pageTitle={t("suggestionEditing.editing") + " " + suggestion.title}
          defaultValues={suggestion}
          onCancel={goBackHandler}
          onRemove={removeClickHandler}
        ></CreateEditForm>
      )}
    </div>
  );
}

export default SuggestionEditPage;
