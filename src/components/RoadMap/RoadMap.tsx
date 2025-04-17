import { SuggestionModel } from "@/models/suggestion-model.ts";
import styles from "./RoadMap.module.css";
import clsx from "clsx";
import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";

type Props = {
  type: string;
  suggestions: SuggestionModel[];
};

function Roadmap({ type, suggestions }: Props) {
  return (
    <div className={styles.roadmap}>
      <div>
        {type} {"(" + suggestions.length + ")"}
      </div>{" "}
      {suggestions.map((s) => (
        <div>
          <div className={clsx(styles.line, styles[type])}></div>
          <Suggestion suggestion={s} />
        </div>
      ))}
    </div>
  );
}

export default Roadmap;
