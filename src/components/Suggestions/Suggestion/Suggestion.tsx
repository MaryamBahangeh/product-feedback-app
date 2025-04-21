import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import { SuggestionContext } from "@/providers/SuggestionProvider.tsx";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import { SUGGESTION_TYPES } from "@/dropdown-options/suggestion-types.ts";

import styles from "./Suggestion.module.css";

import RoadmapBullet, {
  BulletSize,
} from "@/components/RoadMap/RoadmapBullet/RoadmapBullet.tsx";
import clsx from "clsx";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const { increaseRank } = useContext(SuggestionContext);

  const { t } = useTranslation();

  const location = useLocation();
  console.log(location.pathname);
  const suggestionType = t(
    SUGGESTION_TYPES.filter((x) => x.value === suggestion.suggestionType)[0]
      .translationKey as never,
  );

  const addRankClickHandler = (suggestionId: string) => {
    increaseRank(suggestionId);
  };

  return (
    <Card
      className={clsx(
        styles.suggestion,
        location.pathname === "/roadmap" && styles[suggestion.suggestionStatus],
      )}
    >
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
        className={clsx(styles.content)}
        to={"/suggestion/" + suggestion.id}
        state={{ from: location.pathname }}
      >
        {location.pathname === "/roadmap" && (
          <RoadmapBullet
            suggestionStatus={suggestion.suggestionStatus}
            size={BulletSize.SMALL}
          />
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
