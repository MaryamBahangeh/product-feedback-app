import Card from "@/components/Card/Card.tsx";
import styles from "./Board.module.css";

function Board() {
  return (
    <Card className={styles.bord}>
      <div>Frontend Mentor</div>
      <span>Feedback Board</span>
    </Card>
  );
}

export default Board;
