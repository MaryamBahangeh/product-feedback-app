import styles from "./ReplyInfo.module.css";
import { FaArrowUp } from "react-icons/fa6";
import { useRef } from "react";
import { Comment } from "../../models/comment.ts";
import CommentInfo from "../CommentInfo/CommentInfo.tsx";

type Props = {
  replies: Comment[] | null;
  onReply: (replyText: string) => void;
};

function ReplyInfo({ replies, onReply }: Props) {
  const replyRef = useRef<HTMLTextAreaElement>(null);

  const onReplyClick = () => {
    if (!replyRef.current) {
      return;
    }

    onReply(replyRef.current.value);
    replyRef.current.value = "";
  };

  return (
    <div className={styles["reply-info"]}>
      {replies?.map((reply, i) => (
        <CommentInfo key={i} comment={reply} suggestionId={"0"}></CommentInfo>
      ))}
      <label className={styles["comment-reply"]}>
        reply
        <textarea cols="50" rows="2" ref={replyRef}></textarea>
        <button onClick={onReplyClick}>
          <FaArrowUp fontSize="2rem" color="blue" />
        </button>
      </label>
    </div>
  );
}

export default ReplyInfo;
