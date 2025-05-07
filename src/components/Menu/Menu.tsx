import styles from "./Menu.module.css";
import Search from "@/components/Search/Search.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";
import { useTranslation } from "react-i18next";
import RoadmapSummary from "@/components/RoadMap/RoadmapSummary/RoadmapSummary.tsx";

type Props = {
  onApply: () => void;
};

function Menu({ onApply }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.menu}>
      <Search />
      <RoadmapSummary />
      <Button variant={Variant.SOLID} color={Color.PRIMARY} onClick={onApply}>
        {t("menu.apply")}
      </Button>
    </div>
  );
}

export default Menu;
