import styles from "./Header.module.css";
import Button, { Color } from "../Button/Button.tsx";
import { FiPlus } from "react-icons/fi";
import { MdNoteAlt } from "react-icons/md";
import AddModal from "../AddModal/AddModal.tsx";
import { useContext, useRef } from "react";
import { SuggestionContext } from "../../providers/SuggestionProvider.tsx";
import { SuggestionModel } from "../../models/suggestion.ts";

function Header() {
  const { addSuggestion } = useContext(SuggestionContext);
  const ref = useRef<HTMLDialogElement>(null);

  const onAddClickHandler = () => {
    if (!ref.current) {
      return;
    }
    ref.current.showModal();
  };

  const onCancelClickHandler = () => {
    if (!ref.current) {
      return;
    }
    ref.current.close();
  };
  const onSubmitHandler = (newSuggestion: SuggestionModel) => {
    if (!ref.current) {
      return;
    }
    addSuggestion(newSuggestion);
    ref.current.close();
  };

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

      <Button
        color={Color.purple}
        className={styles.add}
        onClick={onAddClickHandler}
      >
        <FiPlus /> Add Feedback
      </Button>

      <AddModal
        onSubmit={onSubmitHandler}
        onCancel={onCancelClickHandler}
        ref={ref}
      />
    </div>
  );
}

export default Header;
