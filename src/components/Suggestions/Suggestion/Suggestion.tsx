import { useContext } from "react";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";
import { RoutingContext } from "@/providers/RoutingProvider.tsx";

import Div from "@/components/Div/Div.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { Suggestion as SuggestionModel } from "@/models/suggestion.ts";
import styles from "./Suggestion.module.css";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const { setPage, setParams } = useContext(RoutingContext);
  const { increaseRank, getComments } = useContext(SuggestionContext);

  const addRankClickHandler = (suggestionId: string) => {
    increaseRank(suggestionId);
  };

  const suggestionClickHandler = () => {
    setPage("suggestion-comments");
    setParams({ suggestionId: suggestion.id });
  };

  return (
    <Div className={styles.suggestion}>
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
        {getComments(suggestion.id).length}
      </div>
    </Div>
  );
}

export default Suggestion;
