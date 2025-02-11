import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionEditPage.module.css";
import { useTranslation } from "react-i18next";

function SuggestionEditPage() {
  const { suggestions, dispatch } = useContext(SuggestionContext);

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
    dispatch({
      type: "edited_suggestion",
      suggestionId: id!,
      newSuggestion,
    });

    goBackHandler();
  };

  const removeClickHandler = (): void => {
    dispatch({ type: "removed_suggestion", suggestionId: id! });
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
