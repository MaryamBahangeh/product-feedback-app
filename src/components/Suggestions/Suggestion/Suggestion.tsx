import styles from "./Suggestion.module.css";
import { SuggestionModel } from "../../../models/suggestion.ts";
import { IoIosArrowUp } from "react-icons/io";
import { FaComment } from "react-icons/fa";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  return (
    <div className={styles.suggestion}>
      <button className={styles.rank}>
        <IoIosArrowUp />
        {suggestion.rank}
      </button>

      <div className={styles.content}>
        <div className={styles.title}>{suggestion.title}</div>
        <div>{suggestion.description}</div>
        <button className={styles.rank}>
          {suggestion.suggestionType.name}
        </button>
      </div>

      <div className={styles.comments}>
        <FaComment color="gray" />
        {suggestion.comments.length}
      </div>
    </div>
  );
}

export default Suggestion;
