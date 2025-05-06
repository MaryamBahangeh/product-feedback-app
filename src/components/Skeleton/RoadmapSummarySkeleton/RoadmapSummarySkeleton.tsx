import styles from "./RoadmapSummarySkeleton.module.css";
import clsx from "clsx";
import { Link } from "react-router";
import Card from "@/components/Card/Card.tsx";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

function RoadmapSummarySkeleton() {
  const { t } = useTranslation();

  return (
    <Card className={clsx(styles.roadmapSkeleton)}>
      <div className={styles.title}>
        <h4>{t("roadMap.roadMap")}</h4>
        <Link to="./roadmap">{t("roadMap.view")}</Link>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <Skeleton className={styles.bullet} />
          <Skeleton className={styles.value} />
        </div>

        <div className={styles.option}>
          <Skeleton className={styles.bullet} />
          <Skeleton className={styles.value} />
        </div>

        <div className={styles.option}>
          <Skeleton className={styles.bullet} />
          <Skeleton className={styles.value} />
        </div>
      </div>
    </Card>
  );
}

export default RoadmapSummarySkeleton;
