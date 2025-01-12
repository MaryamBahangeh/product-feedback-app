import styles from "./RoadMap.module.css";
import Card from "@/components/Card/Card.tsx";
import { Link } from "react-router";

function RoadMap() {
  return (
    <Card className={styles["road-map"]}>
      <div className={styles.title}>
        <h4>Raodmap</h4>
        <Link to="./">view</Link>
      </div>
      <div className={styles.options}>
        <div className={styles.option}>
          <label>
            <div className={styles["orange-bullet"]}></div>
            <span>Planned</span>
          </label>

          <span>2</span>
        </div>

        <div className={styles.option}>
          <label>
            <div className={styles["purple-bullet"]}></div>
            <span>In-Progress</span>
          </label>

          <span>3</span>
        </div>

        <div className={styles.option}>
          <label>
            <div className={styles["blue-bullet"]}></div>
            <span>Live</span>
          </label>

          <span>7</span>
        </div>
      </div>
    </Card>
  );
}

export default RoadMap;
