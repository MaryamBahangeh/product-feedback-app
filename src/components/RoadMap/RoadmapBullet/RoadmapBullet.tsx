import styles from "./RoadmapBullet.module.css";
import clsx from "clsx";

export enum BulletSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

type Props = {
  suggestionStatus: string;
  size: BulletSize;
};

function RoadmapBullet({ suggestionStatus, size }: Props) {
  return (
    <div className={clsx(styles["roadmap-bullet"], styles[size])}>
      <span className={clsx(styles.bullet, styles[suggestionStatus])}></span>
      {suggestionStatus}
    </div>
  );
}

export default RoadmapBullet;
