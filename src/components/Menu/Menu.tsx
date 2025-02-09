import styles from "./Menu.module.css";
import Search from "@/components/Search/Search.tsx";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";
import Button, { Color, Variant } from "@/components/Button/Button.tsx";

type Props = {
  onApply: () => void;
};

function Menu({ onApply }: Props) {
  return (
    <div className={styles.menu}>
      <Search />
      <RoadMap />
      <Button variant={Variant.SOLID} color={Color.PRIMARY} onClick={onApply}>
        Apply
      </Button>
    </div>
  );
}

export default Menu;
