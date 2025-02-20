import { Link } from "react-router";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./Suggestion.module.css";
import { updateSuggestion } from "../../../../api/suggestion.ts";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const addRankClickHandler = (suggestionId: string) => {
    updateSuggestion(suggestionId, { rank: suggestion.rank + 1 }).then();
  };

  return (
    <Card className={styles.suggestion}>
      <Button
        variant={Variant.TONAL}
        color={Color.IDLE}
        className={styles.rank}
        onClick={() => addRankClickHandler(suggestion.id)}
      >
        <img
          src="/images/icones/shared/icon-arrow-up.svg"
          alt="increase rank"
        />
        {suggestion.rank}
      </Button>

      <Link className={styles.content} to={"/suggestion/" + suggestion.id}>
        <h2>{suggestion.title}</h2>

        <div>{suggestion.description}</div>

        <div className={styles.suggestionType}>{suggestion.suggestionType}</div>
      </Link>

      <div className={styles.comments}>
        <img src="/images/icones/shared/icon-comments.svg" alt="" />
        {suggestion.comments.length}
      </div>
    </Card>
  );
}

export default Suggestion;
