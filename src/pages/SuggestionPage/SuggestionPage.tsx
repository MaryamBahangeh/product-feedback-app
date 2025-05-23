import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { v4 as uuidv4 } from "uuid";

import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";
import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";
import CommentsInfo from "@/components/CommentsInfo/CommentsInfo.tsx";
import Textarea from "@/components/Textarea/Textarea.tsx";
import Card from "@/components/Card/Card.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { CommentModel } from "@/models/comment-model.ts";

import { persons } from "@/assets/data/users.ts";

import styles from "./SuggestionPage.module.css";
import { useTranslation } from "react-i18next";
import { useSuggestionStore } from "@/stores/useSuggestionStore.ts";

function SuggestionPage() {
  const { suggestions, editSuggestion } = useSuggestionStore();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();

  const { id } = useParams();

  const [commentText, setCommentText] = useState<string>("");
  const [leftCharacters, setLeftCharacters] = useState<number>(255);

  const suggestion: SuggestionModel = suggestions.filter(
    (suggestion) => suggestion.id === id,
  )[0];

  const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.currentTarget.value);
    setLeftCharacters(255 - e.currentTarget.value.length);
  };

  const addCommentClickHandler = () => {
    const newComment: CommentModel = {
      id: uuidv4(),
      text: commentText,
      user: persons[0],
      comments: [],
    };

    editSuggestion(
      {
        ...suggestion,
        comments: [...suggestion.comments, newComment],
      },
      suggestion.id,
    );
    setCommentText("");
  };

  const addHandler = (comments: CommentModel[]): void => {
    editSuggestion({ ...suggestion, comments }, suggestion.id);
  };

  useEffect(() => {
    if (!id || !suggestion) {
      navigate("/");
    }
  }, [id, navigate, suggestion]);

  if (!id || !suggestion) {
    return <div>{t("common.redirecting")}</div>;
  }

  return (
    <div className={styles["suggestion-comments"]}>
      <PageHeader onGoBack={() => navigate(location.state?.from || "/")}>
        <Button
          buttonType={ButtonType.LINK}
          linkTo={"/suggestion/" + id + "/edit"}
          variant={Variant.SOLID}
          color={Color.SECONDARY}
        >
          {t("suggestionPage.editFeedback")}
        </Button>
      </PageHeader>

      <Suggestion suggestion={suggestion}></Suggestion>

      <Card className={styles.comments}>
        <h2>
          {suggestion.comments.length +
            (suggestion.comments.length > 1 ? " Comments" : " Comment")}
        </h2>

        {suggestion.comments.length > 0 && (
          <CommentsInfo
            comments={suggestion.comments}
            onAdd={addHandler}
          ></CommentsInfo>
        )}
      </Card>

      <Card className={styles["add-comment"]}>
        <h2>{t("suggestionPage.addComment")}</h2>
        <Textarea
          value={commentText}
          onChange={textAreaChangeHandler}
          placeholder={t("suggestionPage.typeYourCommentHere")}
        ></Textarea>

        <div className={styles["button-container"]}>
          <span>
            {leftCharacters + " " + t("suggestionPage.charactersLeft")}
          </span>
          <Button
            variant={Variant.SOLID}
            color={Color.PRIMARY}
            className={styles.add}
            onClick={addCommentClickHandler}
          >
            {t("suggestionPage.postComment")}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SuggestionPage;
