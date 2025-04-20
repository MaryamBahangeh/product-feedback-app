import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useContext } from "react";
import clsx from "clsx";
import Card from "@/components/Card/Card.tsx";
import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";
import RoadmapBullet, {
  BulletSize,
} from "@/components/RoadMap/RoadmapBullet/RoadmapBullet.tsx";
import styles from "./RoadmapSummary.module.css";

type Props = {
  className?: string;
};

function RoadmapSummary({ className }: Props) {
  const { t } = useTranslation();

  const { suggestions } = useContext(SuggestionContext);

  const planned = suggestions.filter(
    (s) => s.suggestionStatus === SUGGESTION_STATUS[1].value,
  ).length;

  const inProgress = suggestions.filter(
    (s) => s.suggestionStatus === SUGGESTION_STATUS[2].value,
  ).length;

  const live = suggestions.filter(
    (s) => s.suggestionStatus === SUGGESTION_STATUS[3].value,
  ).length;

  return (
    <Card className={clsx(styles["roadmap"], className)}>
      <div className={styles.title}>
        <h4>{t("roadMap.roadMap")}</h4>
        <Link to="./roadmap">{t("roadMap.view")}</Link>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <RoadmapBullet
            suggestionStatus={SUGGESTION_STATUS[1].value}
            size={BulletSize.MEDIUM}
          />
          <span className={styles.value}>{planned}</span>
        </div>

        <div className={styles.option}>
          <RoadmapBullet
            suggestionStatus={SUGGESTION_STATUS[2].value}
            size={BulletSize.MEDIUM}
          />
          <span className={styles.value}>{inProgress}</span>
        </div>

        <div className={styles.option}>
          <RoadmapBullet
            suggestionStatus={SUGGESTION_STATUS[3].value}
            size={BulletSize.MEDIUM}
          />
          <span className={styles.value}>{live}</span>
        </div>
      </div>
    </Card>
  );
}

export default RoadmapSummary;
