import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import CreateEditForm from "@/components/CreateEditForm/CreateEditForm.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./SuggestionEditPage.module.css";
import { useTranslation } from "react-i18next";
import { removeSuggestion } from "../../../api/suggestion.ts";
import useSuggestionQueryById from "@/hooks/use-suggestion-query-by-id.ts";

import useSuggestionUpdateMutation from "@/hooks/use-suggestion-update-mutation.ts";

function SuggestionEditPage() {
  const mutation = useSuggestionUpdateMutation();

  const { t } = useTranslation();

  const { id } = useParams();

  // const [suggestion, setSuggestion] = useState<SuggestionModel>();
  // fetchSuggestionById(id!).then((x) => setSuggestion(x));

  const { data: suggestion } = useSuggestionQueryById(id!);

  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/suggestion/" + id);
  };

  const SubmitClickHandler = (newSuggestion: SuggestionModel): void => {
    mutation.mutate({ id: id!, partialSuggestion: newSuggestion });
    goBackHandler();
  };

  const removeClickHandler = (): void => {
    removeSuggestion(id!).then();
    navigate("/");
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

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
