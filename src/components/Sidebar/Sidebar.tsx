import { ReactElement, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import clsx from "clsx";

import Menu from "@/components/Menu/Menu.tsx";
import Board from "@/components/Board/Board.tsx";
import Search from "@/components/Search/Search.tsx";
import RoadmapSummary from "@/components/RoadMap/RoadmapSummary/RoadmapSummary.tsx";
import CardSkeleton from "@/components/Skeleton/CardSkeleton.tsx";

import styles from "./Sidebar.module.css";

type Props = {
  className?: string;
  isLoading: boolean;
};

export default function Sidebar({ className, isLoading }: Props): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={clsx(styles.sidebar, className)}>
      <Board />
      {isLoading ? (
        <CardSkeleton className={styles.searchSkeleton} />
      ) : (
        <Search className={styles.search} />
      )}
      {isLoading ? (
        <CardSkeleton className={styles.roadmapSkeleton} />
      ) : (
        <RoadmapSummary className={styles.roadmap} />
      )}

      <button
        className={styles.menu}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          className={styles.menu}
          src="/images/icones/shared/mobile/icon-hamburger.svg"
          alt=""
        />
      </button>
      {isMenuOpen && <Menu onApply={() => setIsMenuOpen(false)} />}
    </div>
  );
}
