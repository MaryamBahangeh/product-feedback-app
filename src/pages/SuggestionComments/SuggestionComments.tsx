import { ChangeEvent, useContext, useState } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import CommentsInfo from "@/components/CommentsInfo/CommentsInfo.tsx";
import Textarea from "@/components/Textarea/Textarea.tsx";
import Div from "@/components/Div/Div.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";

import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";
import { Comment } from "@/models/comment.ts";
import { persons } from "@/assets/data/users.ts";

import styles from "./SuggestionComments.module.css";

function SuggestionComments() {
  const { suggestions, getComments, addComment } =
    useContext(SuggestionContext);
  const { setPage, params, setParams } = useContext(RoutingContext);

  const comments: Comment[] = getComments(params.suggestionId as string);
  const [commentText, setCommentText] = useState<string>("");
  const [leftCharacters, setLeftCharacters] = useState<number>(255);

  const suggestion: SuggestionModel = suggestions.filter(
    (suggestion) => suggestion.id === params.suggestionId,
  )[0];

  const editFeedbackClickHandler = () => {
    setParams({ suggestion: suggestion, isEditing: true });
    setPage("edit-suggestion");
  };

  const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.currentTarget.value);
    setLeftCharacters(255 - e.currentTarget.value.length);
  };

  const addCommentClickHandler = () => {
    addComment(commentText, persons[1], suggestion.id);
    setCommentText("");
  };

  return (
    <div className={styles["suggestion-comments"]}>
      <PageHeader onGoBack={() => setPage("home")}>
        <Button
          variant={Variant.PRIMARY}
          color={Color.BLUE}
          onClick={editFeedbackClickHandler}
        >
          Edit Feedback
        </Button>
      </PageHeader>

      <Suggestion suggestion={suggestion}></Suggestion>

      <Div className={styles.comments}>
        <h2>
          {comments.length + (comments.length > 1 ? " Comments" : " Comment")}
        </h2>

        {comments.length > 0 && (
          <CommentsInfo comments={comments}></CommentsInfo>
        )}
      </Div>

      <Div className={styles["add-comment"]}>
        <h2>Add Comment</h2>
        <Textarea
          value={commentText}
          onChange={textAreaChangeHandler}
          placeholder={"Type your comment here"}
        ></Textarea>

        <div className={styles["button-container"]}>
          <span>{leftCharacters} characters left</span>
          <Button
            variant={Variant.PRIMARY}
            color={Color.PURPLE}
            className={styles.add}
            onClick={addCommentClickHandler}
          >
            Post Comment
          </Button>
        </div>
      </Div>
    </div>
  );
}

export default SuggestionComments;
