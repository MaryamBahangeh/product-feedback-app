import styles from "./RoadmapBullet.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";

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
  const { t } = useTranslation();

  const translationKey = SUGGESTION_STATUS.find(
    (s) => s.value === suggestionStatus,
  )?.translationKey;

  const translated = t(translationKey as never);

  return (
    <div className={clsx(styles["roadmap-bullet"], styles[size])}>
      <span className={clsx(styles.bullet, styles[suggestionStatus])}></span>
      {translated}
    </div>
  );
}

export default RoadmapBullet;
