import styles from "./RoadmapTabs.module.css";
import clsx from "clsx";

type Props = {
  activateColumn: (activeCol: number) => void;
  activeCol: number;
  tabsTitle: string[];
};

function RoadmapTabs({ activateColumn, activeCol, tabsTitle }: Props) {
  return (
    <>
      <button
        className={clsx(
          styles["roadmap-tab-button"],
          activeCol === 1 ? styles["selected-Planned"] : "",
        )}
        onClick={() => activateColumn(1)}
      >
        {tabsTitle[0]}
      </button>

      <button
        className={clsx(
          styles["roadmap-tab-button"],
          activeCol === 2 ? styles["selected-in-progress"] : "",
        )}
        onClick={() => activateColumn(2)}
      >
        {tabsTitle[1]}
      </button>

      <button
        className={clsx(
          styles["roadmap-tab-button"],
          activeCol === 3 ? styles["selected-live"] : "",
        )}
        onClick={() => activateColumn(3)}
      >
        {tabsTitle[2]}
      </button>
    </>
  );
}

export default RoadmapTabs;
