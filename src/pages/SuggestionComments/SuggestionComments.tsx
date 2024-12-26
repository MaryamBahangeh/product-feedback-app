import { ChangeEvent, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import CommentsInfo from "@/components/CommentsInfo/CommentsInfo.tsx";
import Textarea from "@/components/Textarea/Textarea.tsx";
import Card from "@/components/Card/Card.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";
import { Comment } from "@/models/comment.ts";

import { persons } from "@/assets/data/users.ts";

import styles from "./SuggestionComments.module.css";

function SuggestionComments() {
  const { suggestions, getCommentsByParentId, addComment } =
    useContext(SuggestionContext);
  const { setPage, params, setParams } = useContext(RoutingContext);

  const comments: Comment[] = getCommentsByParentId(
    params.suggestionId as string,
  );
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
    const newComment = {
      id: uuidv4(),
      text: commentText,
      user: persons[0],
      parentId: suggestion.id,
    };
    addComment(newComment);
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

      <Card className={styles.comments}>
        <h2>
          {comments.length + (comments.length > 1 ? " Comments" : " Comment")}
        </h2>

        {comments.length > 0 && (
          <CommentsInfo comments={comments}></CommentsInfo>
        )}
      </Card>

      <Card className={styles["add-comment"]}>
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
      </Card>
    </div>
  );
}

export default SuggestionComments;
