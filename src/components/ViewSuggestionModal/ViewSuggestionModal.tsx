import styles from "./ViewSuggestionModal.module.css";
import { SuggestionModel } from "../../models/suggestion.ts";
import { ForwardedRef, forwardRef, useContext, useState } from "react";
import { SuggestionContext } from "../../providers/SuggestionProvider.tsx";
import Button, { Color } from "../Button/Button.tsx";
import { AiOutlineCloseSquare } from "react-icons/ai";
import CommentInfo from "../CommentInfo/CommentInfo.tsx";
import { Comment } from "../../models/comment.ts";
import { persons } from "../../models/person.ts";

type Props = { suggestion: SuggestionModel; onCancel: () => void };

function ViewSuggestionModal(
  { suggestion, onCancel }: Props,
  ref?: ForwardedRef<HTMLDialogElement>,
) {
  const { addComment } = useContext(SuggestionContext);
  const [comment, setComment] = useState("");

  const onAddHandler = () => {
    addComment(persons[1], suggestion.id, comment);
    setComment("");
  };
  const onCancelClick = () => {
    setComment("");
    onCancel();
  };
  return (
    <dialog className={styles.dialog} ref={ref}>
      <div className={styles["dialog-info"]}>
        <div className={styles.header}>
          <h3>{suggestion.comments?.length} comments</h3>
          <button onClick={onCancelClick}>
            <AiOutlineCloseSquare size="2.5rem" />
          </button>
        </div>

        {suggestion.comments?.map((comment: Comment) => (
          <CommentInfo
            comment={comment}
            suggestionId={suggestion.id}
          ></CommentInfo>
        ))}

        <div className={styles["add-comment"]}>
          <label>
            comment:
            <textarea
              cols="50"
              rows="2"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
          </label>

          <Button
            color={Color.blue}
            className={styles.add}
            onClick={onAddHandler}
          >
            Add
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default forwardRef(ViewSuggestionModal);
