// import { Link } from "react-router";

import clsx from "clsx";

import Card from "@/components/Card/Card.tsx";

import styles from "./RoadmapSummary.module.css";
import { useTranslation } from "react-i18next";
import {Link} from "react-router";

type Props = {
  className?: string;
};

function RoadmapSummary({ className }: Props) {
  const { t } = useTranslation();

  return (
    <Card className={clsx(styles["roadmap"], className)}>
      <div className={styles.title}>
        <h4>{t("roadMap.roadMap")}</h4>
        <Link to="./roadmap">{t("roadMap.view")}</Link>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <span className={clsx(styles["bullet"], styles["orange"])}></span>
          {t("roadMap.planned")} <span className={styles.value}>2</span>
        </div>

        <div className={styles.option}>
          <span className={clsx(styles["bullet"], styles["purple"])}></span>
          {t("roadMap.inProgressed")} <span className={styles.value}>3</span>
        </div>

        <div className={styles.option}>
          <span className={clsx(styles["bullet"], styles["blue"])}></span>
          {t("roadMap.live")} <span className={styles.value}>7</span>
        </div>
      </div>
    </Card>
  );
}

export default RoadmapSummary;
