import { ReactElement, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import clsx from "clsx";

import Menu from "@/components/Menu/Menu.tsx";
import Board from "@/components/Board/Board.tsx";
import Search from "@/components/Search/Search.tsx";
import RoadmapSummary from "@/components/RoadMap/RoadmapSummary/RoadmapSummary.tsx";

import styles from "./Sidebar.module.css";
import SearchSkeleton from "@/components/Skeleton/SearchSkeleton/SearchSkeleton.tsx";
import RoadmapSummarySkeleton from "@/components/Skeleton/RoadmapSummarySkeleton/RoadmapSummarySkeleton.tsx";

type Props = {
  className?: string;
  isLoading: boolean;
};

export default function Sidebar({ className, isLoading }: Props): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={clsx(styles.sidebar, className)}>
      <Board />
      {isLoading ? <SearchSkeleton /> : <Search className={styles.search} />}
      {isLoading ? (
        <RoadmapSummarySkeleton />
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
