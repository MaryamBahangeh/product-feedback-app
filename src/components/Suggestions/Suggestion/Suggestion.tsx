import styles from "./Suggestion.module.css";
import { SuggestionModel } from "../../../models/suggestion.ts";
import { IoIosArrowUp } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import Button, { Color } from "../../Button/Button.tsx";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  return (
    <div className={styles.suggestion}>
      <Button color={Color.gray} className={styles.rank}>
        <IoIosArrowUp /> {suggestion.rank}
      </Button>

      <div className={styles.content}>
        <div className={styles.title}>{suggestion.title}</div>
        <div>{suggestion.description}</div>
        <div className={styles.suggestionType}>
          {suggestion.suggestionType.name}
        </div>
      </div>

      <div className={styles.comments}>
        <FaComment color="lightgray" />
        {suggestion.comments.length}
      </div>
    </div>
  );
}

export default Suggestion;
