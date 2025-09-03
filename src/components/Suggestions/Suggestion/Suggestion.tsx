import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import Card from "@/components/Card/Card.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

import { SuggestionModel } from "@/models/suggestion-model.ts";

import { SUGGESTION_TYPES } from "@/dropdown-options/suggestion-types.ts";

import styles from "./Suggestion.module.css";

import RoadmapBullet, {
  BulletSize,
} from "@/components/RoadMap/RoadmapBullet/RoadmapBullet.tsx";
import clsx from "clsx";
import { useSuggestionStore } from "@/stores/useSuggestionStore.ts";

function Suggestion({ suggestion }: { suggestion: SuggestionModel }) {
  const { increaseRank } = useSuggestionStore();

  const { t } = useTranslation();

  const location = useLocation();
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
        location.pathname === "/roadmap"
          ? styles[suggestion.suggestionStatus]
          : location.pathname === "/" && styles.suggestionHover,
        location.pathname === "/roadmap" && styles.roadmap,
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
      {location.pathname.includes("/suggestion") ? (
        <div className={styles.content}>
          <h2>{suggestion.title}</h2>
          <div>{suggestion.description}</div>
          <div className={styles.suggestionType}>{suggestionType}</div>
        </div>
      ) : (
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

          <h2
            className={clsx(
              styles.hoverTitle,
              location.pathname === "/roadmap" && styles.title,
            )}
          >
            {suggestion.title}
          </h2>

          <div
            className={
              location.pathname === "/roadmap" ? styles.description : ""
            }
          >
            {suggestion.description}
          </div>

          <div className={styles.suggestionType}>{suggestionType}</div>
        </Link>
      )}
      <div className={styles.comments}>
        <img src="/images/icones/shared/icon-comments.svg" alt="" />
        {suggestion.comments.length}
      </div>
    </Card>
  );
}

export default Suggestion;
