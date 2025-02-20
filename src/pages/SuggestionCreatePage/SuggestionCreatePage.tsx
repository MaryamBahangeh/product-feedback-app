import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionCreatePage.module.css";
import { useNavigate } from "react-router";
import { addSuggestion } from "../../../api/suggestion.ts";

function SuggestionCreatePage() {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel) => {
    addSuggestion(newSuggestion).then();
    goBackHandler();
  };

  return (
    <div className={styles.content}>
      <PageHeader onGoBack={goBackHandler} />

      <CreateEditForm
        onSubmitClick={SubmitClickHandler}
        pageTitle={"Add a new suggestion"}
        onCancel={goBackHandler}
        onRemove={goBackHandler}
      ></CreateEditForm>
    </div>
  );
}

export default SuggestionCreatePage;
