import styles from "./Header.module.css";
import Button, { Color } from "../Button/Button.tsx";
import { FiPlus } from "react-icons/fi";
import { MdNoteAlt } from "react-icons/md";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <MdNoteAlt />
        <div>6 suggestion</div>
        <label>
          Sort by:
          <select>
            <option value="MostUpvotes">Most Upvotes</option>
          </select>
        </label>
      </div>

      <Button color={Color.purple} className={styles.add}>
        <FiPlus /> Add Feedback
      </Button>
    </div>
  );
}

export default Header;
