import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";

import styles from "./ToolbarSkeleton.module.css";

import { useTranslation } from "react-i18next";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

function Toolbar() {
  const { t } = useTranslation();

  return (
    <div className={styles.toolbarSkeleton}>
      <div className={styles.suggestions}>
        <img src="/images/icones/suggestion/icon-suggestions.svg" alt="" />

        <Skeleton className={styles.suggestionSkeleton} />
      </div>

      <label>
        {t("toolbar.sortBy")}:
        <Skeleton className={styles.sortBySkeleton} />
      </label>

      <Skeleton className={styles.languageSkeleton} />

      <Button
        buttonType={ButtonType.LINK}
        linkTo={"/suggestion/create"}
        variant={Variant.SOLID}
        color={Color.PRIMARY}
      >
        <img src="/images/icones/shared/icon-plus.svg" alt="add feedback" />
        {t("toolbar.addFeedback")}
      </Button>
    </div>
  );
}

export default Toolbar;
