
import {SuggestionModel} from "@/models/suggestion-model.ts";
import styles from './RoadMap.module.css'
import clsx from "clsx";
import Suggestion from "@/components/Suggestions/Suggestion/Suggestion.tsx";

type Props = {
type:string;
suggestion: SuggestionModel;
}

function Roadmap({type, suggestion}:Props) {
    return (
        <div className={styles.roadmap}>
        <div className={ clsx(styles.line , styles[type])} ></div>
       <Suggestion suggestion={suggestion}/>
        </div>
    );
}

export default Roadmap;