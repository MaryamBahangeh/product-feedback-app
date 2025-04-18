import { SuggestionModel } from "@/models/suggestion-model.ts";
import styles from "./RoadMap.module.css";
import clsx from "clsx";
import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";
import { useTranslation } from "react-i18next";

type Props = {
  type: string;
  description: string;
  suggestions: SuggestionModel[];
};

function Roadmap({ type, description, suggestions }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.roadmap}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={clsx(styles["bullet"], styles[type])}></span>
          {t(("createEditForm.statusOptions." + type) as never) +
            "(" +
            suggestions.length +
            ")"}
        </div>
        <div className={styles.description}>{description}</div>
      </div>

      {suggestions.map((s) => (
        <div>
          <div className={clsx(styles.line, styles[type])}></div>
          <Suggestion key={s.id} suggestion={s} />
        </div>
      ))}
    </div>
  );
}

export default Roadmap;
