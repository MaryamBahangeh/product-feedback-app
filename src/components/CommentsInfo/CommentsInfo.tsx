import { useContext } from "react";
import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import Reply from "@/components/Reply/Reply.tsx";
import { Comment } from "@/models/comment.ts";
import styles from "./CommentsInfo.module.css";

type Props = {
  comments: Comment[];
};

function CommentsInfo({ comments }: Props) {
  const { getComments } = useContext(SuggestionContext);

  return (
    <div className={styles.comments}>
      {comments.map((comment: Comment) => (
        <div key={comment.id} className={styles["comment-info"]}>
          <Reply
            parentId={comment.id}
            parentUsername={""}
            user={comment.user}
            text={comment.text}
          ></Reply>

          <div className={styles["replies-container"]}>
            <div className={styles.line}></div>
            <div className={styles.replies}>
              {getComments(comment.id).map((reply: Comment) => (
                <Reply
                  key={reply.id}
                  parentId={comment.id}
                  parentUsername={comment.user.userName}
                  user={reply.user}
                  text={reply.text}
                ></Reply>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsInfo;
