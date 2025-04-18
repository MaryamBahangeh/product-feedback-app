import { useContext } from "react";
import { Link, useLocation } from "react-router";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import styles from "./Suggestion.module.css";
import { SUGGESTION_TYPES } from "@/dropdown-options/suggestion-types.ts";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { SUGGESTION_STATUS } from "@/dropdown-options/suggestion-status.ts";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const { increaseRank } = useContext(SuggestionContext);

  const { t } = useTranslation();

  const location = useLocation();

  const suggestionType = t(
    SUGGESTION_TYPES.filter((x) => x.value === suggestion.suggestionType)[0]
      .translationKey as never,
  );

  const addRankClickHandler = (suggestionId: string) => {
    increaseRank(suggestionId);
  };

  const suggestionStatus = t(
    SUGGESTION_STATUS.filter((x) => x.value === suggestion.suggestionStatus)[0]
      .translationKey as never,
  );

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
      <Link
        className={styles.content}
        to={"/suggestion/" + suggestion.id}
        state={{ from: location.pathname }}
      >
        {location.pathname === "/roadmap" && (
          <div className={styles.roadmap}>
            <span
              className={clsx(
                styles["bullet"],
                styles[suggestion.suggestionStatus],
              )}
            ></span>
            {suggestionStatus}{" "}
          </div>
        )}

        <h2>{suggestion.title}</h2>

        <div>{suggestion.description}</div>

        <div className={styles.suggestionType}>{suggestionType}</div>
      </Link>
      <div className={styles.comments}>
        <img src="/images/icones/shared/icon-comments.svg" alt="" />
        {suggestion.comments.length}
      </div>
    </Card>
  );
}

export default Suggestion;
