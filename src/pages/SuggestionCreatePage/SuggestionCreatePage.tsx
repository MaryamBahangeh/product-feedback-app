import { useContext } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionCreatePage.module.css";
import { useNavigate } from "react-router";

function SuggestionCreatePage() {
  const { addSuggestion } = useContext(SuggestionContext);

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
        pageTitle={"Add a new suggestion"}
        onCancel={goBackHandler}
        onDelete={goBackHandler}
      ></CreateEditForm>
    </div>
  );
}

export default SuggestionCreatePage;
