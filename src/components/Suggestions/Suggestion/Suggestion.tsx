import styles from "./Suggestion.module.css";
import { SuggestionModel } from "../../../models/suggestion.ts";
import { IoIosArrowUp } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import Button, { Color } from "../../Button/Button.tsx";
import { useContext, useRef, useState } from "react";
import { SuggestionContext } from "../../../providers/SuggestionProvider.tsx";
// import ViewSuggestionInfo from "./ViewSuggestionInfo/ViewSuggestionInfo.tsx";
import ViewSuggestionModal from "../../ViewSuggestionModal/ViewSuggestionModal.tsx";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const { increaseRank } = useContext(SuggestionContext);

  const [isOpen, setIsOpen] = useState(false);

  const onAddRankClickHandler = (id: string) => {
    increaseRank(id);
    setShowSuggestionInfo(!showSuggestionInfo);
  };

  const [showSuggestionInfo, setShowSuggestionInfo] = useState(false);

  const ref = useRef<HTMLDialogElement | null>(null);

  const openModalHandler = () => {
    setIsOpen(true);

    if (!ref.current) {
      return;
    }

    ref.current.showModal();
  };

  const onCancelClickHandler = () => {
    setIsOpen(false);

    if (!ref.current) {
      return;
    }

    ref.current.close();
  };

  return (
    <>
      <div
        className={styles.suggestion}
        // onClick={() => setShowSuggestionInfo(!showSuggestionInfo)}
      >
        <Button
          color={Color.gray}
          className={styles.rank}
          onClick={() => onAddRankClickHandler(suggestion.id)}
        >
          <IoIosArrowUp /> {suggestion.rank}
        </Button>

        <div className={styles.content} onClick={openModalHandler}>
          <h2 className={styles.title}> {suggestion.title}</h2>

          <div>{suggestion.description}</div>
          <div className={styles.suggestionType}>
            {suggestion.suggestionType}
          </div>
        </div>

        <div className={styles.comments}>
          <FaComment color="lightgray" />
          {suggestion.comments ? suggestion.comments.length : 0}
        </div>
      </div>
      {/*{showSuggestionInfo ? (*/}
      {/*  <ViewSuggestionInfo suggestion={suggestion}></ViewSuggestionInfo>*/}
      {/*) : null}*/}

      <ViewSuggestionModal
        suggestion={suggestion}
        isOpen={isOpen}
        onCancel={onCancelClickHandler}
        ref={ref}
      ></ViewSuggestionModal>
    </>
  );
}

export default Suggestion;
