import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionCreatePage.module.css";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useSuggestionStore } from "@/stores/useSuggestionStore.ts";

function SuggestionCreatePage() {
  const { t } = useTranslation();

  const { addSuggestion } = useSuggestionStore();

  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel) => {
    addSuggestion(newSuggestion);
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
