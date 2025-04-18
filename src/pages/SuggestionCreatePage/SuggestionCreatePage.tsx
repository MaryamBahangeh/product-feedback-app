import { useContext } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionCreatePage.module.css";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function SuggestionCreatePage() {
  const { t } = useTranslation();

  const { dispatch } = useContext(SuggestionContext);

  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel) => {
    dispatch({ type: "added_suggestion", newSuggestion });
    goBackHandler();
  };

  return (
    <div className={styles.content}>
      <PageHeader onGoBack={goBackHandler} />

      <CreateEditForm
        onSubmitClick={SubmitClickHandler}
        pageTitle={t("createEditForm.addANewSuggestion")}
        onCancel={goBackHandler}
        onRemove={goBackHandler}
      ></CreateEditForm>
    </div>
  );
}

export default SuggestionCreatePage;
