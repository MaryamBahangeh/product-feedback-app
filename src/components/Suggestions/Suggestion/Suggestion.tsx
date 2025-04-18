import { Link } from "react-router";

import useSuggestionUpdateMutation from "@/hooks/use-suggestion-update-mutation.ts";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./Suggestion.module.css";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const mutation = useSuggestionUpdateMutation();

  const addRankClickHandler = (suggestionId: string) => {
    mutation.mutate({
      id: suggestionId,
      partialSuggestion: { rank: suggestion.rank + 1 },
    });
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
