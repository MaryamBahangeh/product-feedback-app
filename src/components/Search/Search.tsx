import styles from "./Search.module.css";
import { SUGGESTION_Options } from "../../models/suggestion-options.ts";
import Button, { Color } from "../Button/Button.tsx";

function Search() {
  return (
    <div className={styles.search}>
      <Button color={Color.gray}>All</Button>
      {SUGGESTION_Options.map((option) => (
        <Button color={Color.gray}>{option.name}</Button>
      ))}
    </div>
  );
}

export default Search;
