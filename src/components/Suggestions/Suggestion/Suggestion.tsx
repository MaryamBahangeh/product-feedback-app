import { useContext } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./Suggestion.module.css";
import { useNavigate } from "react-router";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const { increaseRank, getCommentsByParentId } = useContext(SuggestionContext);

  const addRankClickHandler = (suggestionId: string) => {
    increaseRank(suggestionId);
  };

  const navigate = useNavigate();
  const suggestionClickHandler = () => {
    navigate(`/suggestion-comments/${suggestion.id}`);
  };

  return (
    <Card className={styles.suggestion}>
      <Button
        variant={Variant.SECONDARY}
        color={Color.GRAY}
        className={styles.rank}
        onClick={() => addRankClickHandler(suggestion.id)}
      >
        <img
          src="/images/icones/shared/icon-arrow-up.svg"
          alt="increase rank"
        />
        {suggestion.rank}
      </Button>

      <div className={styles.content} onClick={suggestionClickHandler}>
        <h2>{suggestion.title}</h2>

        <div>{suggestion.description}</div>

        <div className={styles.suggestionType}>{suggestion.suggestionType}</div>
      </div>

      <div className={styles.comments}>
        <img src="/images/icones/shared/icon-comments.svg" alt="" />
        {getCommentsByParentId(suggestion.id).length}
      </div>
    </Card>
  );
}

export default Suggestion;
