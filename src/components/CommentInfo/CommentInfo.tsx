import styles from "./CommentInfo.module.css";
import { useContext, useState } from "react";
import { SuggestionContext } from "../../providers/SuggestionProvider.tsx";
import { persons } from "../../models/person.ts";
import { Comment } from "../../models/comment.ts";
import ReplyInfo from "../ReplyInfo/ReplyInfo.tsx";

type Props = { comment: Comment; suggestionId: string };

function CommentInfo({ comment, suggestionId }: Props) {
  const [showReply, setShowReply] = useState(false);
  const { reply } = useContext(SuggestionContext);

  const onReplyClickHandler = (replyText: string) => {
    reply(persons[0], suggestionId, comment.id, replyText);
    setShowReply(false);
  };

  return (
    <div className={styles.comments}>
      <div className={styles["user-info"]}>
        <img src={comment.sender.imageUrl} />
        <div className={styles["comment-info"]}>
          <div className={styles.name}>
            <h3>
              {comment.sender.firstName} {comment.sender.lastName}
            </h3>
            <div className={styles.username}>
              <div> {comment.sender.userName}</div>
              <div>
                <button
                  onClick={() => {
                    setShowReply(true);
                  }}
                >
                  {comment.reply?.length} Reply
                </button>
              </div>
            </div>
            <p>{comment.commentText}</p>
          </div>
          {showReply ? (
            <ReplyInfo
              replies={comment.reply}
              onReply={onReplyClickHandler}
            ></ReplyInfo>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CommentInfo;
