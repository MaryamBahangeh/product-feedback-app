import styles from "./SuggestionSkeleton.module.css";
import Card from "@/components/Card/Card.tsx";
import Skeleton from "react-loading-skeleton";
function SuggestionSkeleton() {
  return (
    <Card className={styles.SuggestionSkeleton} aria-hidden={true}>
      <Skeleton className={styles.title}></Skeleton>
      <Skeleton className={styles.description}></Skeleton>
      <Skeleton className={styles.type}></Skeleton>
      <div className={styles.rankComment}>
        <Skeleton className={styles.rank} />
        <Skeleton className={styles.comment} />
      </div>
    </Card>
  );
}

export default SuggestionSkeleton;
