import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";
import RoadmapHeader from "@/components/RoadMap/RoadmapHeader/RoadmapHeader.tsx";
import RoadmapTabs from "@/components/RoadMap/RoadmapTabs/RoadmapTabs.tsx";
import styles from "./RoadmapPage.module.css";
import { useSuggestionStore } from "@/stores/useSuggestionStore.ts";

function RoadmapPage() {
  const { suggestions } = useSuggestionStore();
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

  const activateColumn = (activeCol: number) => {
    setActiveCol(activeCol);
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

  const plannedText =
    t(SUGGESTION_STATUS[1].translationKey as never) +
    " (" +
    planned.length +
    ")";

  const inProgressText =
    t(SUGGESTION_STATUS[2].translationKey as never) +
    " (" +
    inProgress.length +
    ")";

  const liveText =
    t(SUGGESTION_STATUS[3].translationKey as never) + " (" + live.length + ")";

  return (
    <div className={styles.roadmap}>
      <RoadmapHeader />

      <div className={styles.tabs}>
        <RoadmapTabs
          activateColumn={activateColumn}
          activeCol={activeCol}
          tabsTitle={[plannedText, inProgressText, liveText]}
        />
      </div>

      <div className={styles.content}>
        <div
          className={clsx(
            styles["column"],
            activeCol !== 1 ? styles["not-visible"] : "",
          )}
        >
          <RoadMap
            type="Planned"
            description={t("roadMap.ideasPrioritizedFoResearch")}
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
            type="In-Progress"
            description={t("roadMap.currentlyBeingDeveloped")}
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
            type="Live"
            description={t("roadMap.releasedFeatures")}
            suggestions={live}
          />
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
