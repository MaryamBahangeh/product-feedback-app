import { User } from "@/assets/data/users.ts";

import Reply from "@/components/Reply/Reply.tsx";

import { CommentModel } from "@/models/comment-model.ts";

import styles from "./CommentsInfo.module.css";

type Props = {
  mention?: User;
  comments: CommentModel[];
  onAdd: (comments: CommentModel[]) => void;
};

function CommentsInfo({ mention, comments, onAdd }: Props) {
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
            mention={mention}
            user={comment.user}
            text={comment.text}
            onAdd={(newComment) => replyAddHandler(comment, newComment)}
          ></Reply>

          {comment.comments.length > 0 && (
            <div className={styles["replies-container"]}>
              <div className={styles.line}></div>
              <div className={styles.replies}>
                <CommentsInfo
                  mention={comment.user}
                  comments={comment.comments}
                  onAdd={(updatedComments) =>
                    commentAddHandler(comment, updatedComments)
                  }
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentsInfo;
