import { useNavigate } from "react-router";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import useSuggestionInsertMutation from "@/hooks/use-suggestion-insert-mutation.ts";

import styles from "./SuggestionCreatePage.module.css";

function SuggestionCreatePage() {
  const mutation = useSuggestionInsertMutation();

  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/");
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel) => {
    mutation.mutate(newSuggestion);
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
