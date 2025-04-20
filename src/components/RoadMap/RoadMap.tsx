import clsx from "clsx";
import { SuggestionModel } from "@/models/suggestion-model.ts";
import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";
import RoadmapBullet, {
  BulletSize,
} from "@/components/RoadMap/RoadmapBullet/RoadmapBullet.tsx";
import styles from "./RoadMap.module.css";

type Props = {
  type: string;
  description: string;
  suggestions: SuggestionModel[];
};

function Roadmap({ type, description, suggestions }: Props) {
  return (
    <div className={styles.roadmap}>
      <div className={styles.header}>
        <div className={styles.title}>
          <RoadmapBullet suggestionStatus={type} size={BulletSize.LARGE} />
          <span> ({suggestions.length})</span>
        </div>
        <div className={styles.description}>{description}</div>
      </div>

      {suggestions.map((s) => (
        <div key={s.id}>
          <div className={clsx(styles.line, styles[type])}></div>
          <Suggestion suggestion={s} />
        </div>
      ))}
    </div>
  );
}

export default Roadmap;
