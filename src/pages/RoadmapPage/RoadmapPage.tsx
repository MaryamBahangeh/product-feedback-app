import styles from "./RoadmapPage.module.css";

import { useContext, useEffect, useState } from "react";
import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import RoadmapHeader from "@/components/RoadMap/RoadmapHeader/RoadmapHeader.tsx";

function RoadmapPage() {
  const { suggestions } = useContext(SuggestionContext);
  const { t } = useTranslation();

  const planned = suggestions.filter(
    (s) => s.suggestionStatus === SUGGESTION_STATUS[1].value,
  );
  const inProgress = suggestions.filter(
    (s) => s.suggestionStatus === SUGGESTION_STATUS[2].value,
  );
  const live = suggestions.filter(
    (s) => s.suggestionStatus === SUGGESTION_STATUS[3].value,
  );

  const [activeCol, setActiveCol] = useState<number>(0);
  const activateColumn = (colNumber: number) => {
    setActiveCol(colNumber);
  };

  const handleResize = () => {
    if (window.innerWidth < 640) setActiveCol(1);
  };
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.roadmap}>
      <RoadmapHeader />

      <div className={styles.tabs}>
        <button
          className={activeCol === 1 ? styles["selected-Planned"] : ""}
          onClick={() => activateColumn(1)}
        >
          {t(SUGGESTION_STATUS[1].translationKey as never) +
            " (" +
            planned.length +
            ")"}
        </button>

        <button
          className={activeCol === 2 ? styles["selected-in-progress"] : ""}
          onClick={() => activateColumn(2)}
        >
          {t(SUGGESTION_STATUS[2].translationKey as never) +
            " (" +
            inProgress.length +
            ")"}
        </button>

        <button
          className={activeCol === 3 ? styles["selected-live"] : ""}
          onClick={() => activateColumn(3)}
        >
          {t(SUGGESTION_STATUS[3].translationKey as never) +
            " (" +
            live.length +
            ")"}
        </button>
      </div>

      <div className={styles.content}>
        <div
          className={clsx(
            styles["column"],
            activeCol !== 1 ? styles["not-visible"] : "",
          )}
        >
          <RoadMap
            type={t(SUGGESTION_STATUS[1].translationKey as never)}
            suggestions={planned}
          />
        </div>

        <div
          className={clsx(
            styles["column"],
            activeCol !== 2 ? styles["not-visible"] : "",
          )}
        >
          <RoadMap
            type={t(SUGGESTION_STATUS[2].translationKey as never)}
            suggestions={inProgress}
          />
        </div>

        <div
          className={clsx(
            styles["column"],
            activeCol !== 3 ? styles["not-visible"] : "",
          )}
        >
          <RoadMap
            type={t(SUGGESTION_STATUS[3].translationKey as never)}
            suggestions={live}
          />
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
