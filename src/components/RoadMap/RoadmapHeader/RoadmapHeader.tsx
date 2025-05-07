import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Button, {
  ButtonType,
  Color,
  Variant,
} from "@/components/Button/Button.tsx";

import styles from "./RoadmapHeader.module.css";

function RoadmapHeader() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className={styles["roadmap-header"]}>
      <div className={styles.content}>
        <Button variant={Variant.TEXT} onClick={() => navigate("/")}>
          <img
            src="/images/icones/shared/icon-arrow-left-white.svg"
            alt="back"
          />
          {t("pageHeader.goBack")}
        </Button>
        <div>{t("roadMap.roadMap")}</div>
      </div>

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

export default RoadmapHeader;
