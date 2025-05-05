import Card from "@/components/Card/Card.tsx";
import styles from "./SearchSkeleton.module.css";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";

function SearchSkeleton() {
  return (
    <Card className={styles.SearchSkeleton}>
      <Skeleton className={clsx(styles.skeleton, styles.skeleton1)} />
      <Skeleton className={clsx(styles.skeleton, styles.skeleton2)} />
      <Skeleton className={clsx(styles.skeleton, styles.skeleton3)} />
      <Skeleton className={clsx(styles.skeleton, styles.skeleton4)} />
      <Skeleton className={clsx(styles.skeleton, styles.skeleton5)} />
      <Skeleton className={clsx(styles.skeleton, styles.skeleton6)} />
    </Card>
  );
}

export default SearchSkeleton;
