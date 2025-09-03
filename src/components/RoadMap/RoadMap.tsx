import { SuggestionModel } from "@/models/suggestion-model.ts";
import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";
import RoadmapBullet, {
  BulletSize,
} from "@/components/RoadMap/RoadmapBullet/RoadmapBullet.tsx";
import styles from "./RoadMap.module.css";
import { motion } from "framer-motion";

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
        <motion.div
          layout
          key={s.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          <Suggestion suggestion={s} />
        </motion.div>
      ))}
    </div>
  );
}

export default Roadmap;
