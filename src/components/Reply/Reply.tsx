import { useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { FaArrowUp } from "react-icons/fa6";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import Textarea from "@/components/Textarea/Textarea.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { persons, User } from "@/assets/data/users.ts";

import { Comment } from "@/models/comment.ts";

import styles from "./Reply.module.css";

type Props = {
  parentId: string;
  parentUsername: string;
  user: User;
  text: string;
};

function Reply({ parentId, parentUsername, user, text }: Props) {
  const { addComment } = useContext(SuggestionContext);

  const [showReplyTextarea, setShowReplyTextarea] = useState(false);
  const [replyText, setReplyText] = useState<string>("");

  const replyClickHandler = () => {
    const newComment: Comment = {
      id: uuidv4(),
      text: replyText,
      user: persons[1],
      parentId: parentId,
    };

    addComment(newComment);
    setReplyText("");
    setShowReplyTextarea(false);
  };

  return (
    <div className={styles["reply-info"]}>
      <img src={user.imageUrl} alt="" />

      <div className={styles["user-info"]}>
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <span> {user.userName}</span>
        <p>
          <span>{parentUsername}</span> {text}
        </p>

        {showReplyTextarea && (
          <div className={styles["textarea-container"]}>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.currentTarget.value)}
            ></Textarea>

            <Button
              variant={Variant.SECONDARY}
              color={Color.TRANSPARENT}
              onClick={() => replyClickHandler()}
            >
              <FaArrowUp fontSize="2rem" color="blue" />
            </Button>
          </div>
        )}
      </div>

      <Button
        variant={Variant.SECONDARY}
        color={Color.TRANSPARENT}
        className={styles["reply-button"]}
        onClick={() => {
          setShowReplyTextarea((old) => !old);
        }}
      >
        Reply
      </Button>
    </div>
  );
}

export default Reply;
