import Reply from "@/components/Reply/Reply.tsx";

import { CommentModel } from "@/models/comment-model.ts";

import styles from "./CommentsInfo.module.css";

type Props = {
  comments: CommentModel[];
  onAdd: (comments: CommentModel[]) => void;
};

function CommentsInfo({ comments, onAdd }: Props) {
  const replyAddHandler = (
    parentComment: CommentModel,
    newComment: CommentModel,
  ): void => {
    const result = comments.map((x) => {
      if (x.id === parentComment.id) {
        return { ...x, comments: [...x.comments, newComment] };
      }

      return x;
    });

    onAdd(result);
  };

  const commentAddHandler = (
    parentComment: CommentModel,
    updatedComments: CommentModel[],
  ): void => {
    const result = comments.map((x) => {
      if (x.id === parentComment.id) {
        return { ...x, comments: updatedComments };
      }

      return x;
    });

    onAdd(result);
  };

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles["comment-info"]}>
          <Reply
            parentUsername={""}
            user={comment.user}
            text={comment.text}
            onAdd={(newComment) => replyAddHandler(comment, newComment)}
          ></Reply>

          <div className={styles["replies-container"]}>
            <div className={styles.line}></div>
            <div className={styles.replies}>
              <CommentsInfo
                comments={comment.comments}
                onAdd={(updatedComments) =>
                  commentAddHandler(comment, updatedComments)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsInfo;
