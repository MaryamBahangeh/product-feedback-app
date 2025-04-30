import Card from "@/components/Card/Card.tsx";
import Skeleton from "react-loading-skeleton";

function CardSkeleton({ className }: { className: string }) {
  return (
    <Card>
      <Skeleton className={className} />
    </Card>
  );
}

export default CardSkeleton;
