import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { v4 as uuidv4 } from "uuid";

import useSuggestionQueryById from "@/hooks/use-suggestion-query-by-id.ts";
import useSuggestionUpdateMutation from "@/hooks/use-suggestion-update-mutation.ts";

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

import { CommentModel } from "@/models/comment-model.ts";

import { persons } from "@/assets/data/users.ts";

import styles from "./SuggestionPage.module.css";

function SuggestionPage() {
  const mutation = useSuggestionUpdateMutation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { id } = useParams();

  const [commentText, setCommentText] = useState<string>("");

  const [leftCharacters, setLeftCharacters] = useState<number>(255);

  const { data: suggestion } = useSuggestionQueryById(id!);

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

    mutation.mutate({
      id: suggestion!.id,
      partialSuggestion: {
        comments: [...suggestion!.comments, newComment],
      },
    });
    setCommentText("");
  };

  const addHandler = (comments: CommentModel[]): void => {
    mutation.mutate({
      id: suggestion!.id,
      partialSuggestion: { ...suggestion, comments },
    });
  };

  //!!!!!!!!!!!!!
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  if (!id || !suggestion) {
    return <div>{t("common.redirecting")}</div>;
  }

  return (
    <div className={styles["suggestion-comments"]}>
      <PageHeader onGoBack={() => navigate("/")}>
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
