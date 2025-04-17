
import {SuggestionModel} from "@/models/suggestion-model.ts";

type Props = {
type:string;
suggestion: SuggestionModel;
}

function Roadmap({type, suggestion}:Props) {
    return (
        <div>{suggestion.title}</div>
    );
}

export default Roadmap;