import { Link } from "react-router";

import clsx from "clsx";

import Card from "@/components/Card/Card.tsx";

import styles from "./RoadMap.module.css";

type Props = {
  className?: string;
};

function RoadMap({ className }: Props) {
  return (
    <Card className={clsx(styles["roadmap"], className)}>
      <div className={styles.title}>
        <h4>Raodmap</h4>
        <Link to="./">view</Link>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <span className={clsx(styles["bullet"], styles["orange"])}></span>
          Planned <span className={styles.value}>2</span>
        </div>

        <div className={styles.option}>
          <span className={clsx(styles["bullet"], styles["purple"])}></span>
          In-Progressed <span className={styles.value}>3</span>
        </div>

        <div className={styles.option}>
          <span className={clsx(styles["bullet"], styles["blue"])}></span>
          Live <span className={styles.value}>7</span>
        </div>
      </div>
    </Card>
  );
}

export default RoadMap;
