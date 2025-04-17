import styles from './RoadmapPage.module.css'
import Toolbar from "@/components/Toolbar/Toolbar.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {SuggestionContext} from "@/providers/SuggestionProvider.tsx";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";
import {SUGGESTION_STATUS} from "@/dropdown-options/suggestion-status.ts";

function RoadmapPage() {
    const navigate= useNavigate();
   const {suggestions}=useContext(SuggestionContext)
    return (
        <div className={styles.roadmap}>
            <PageHeader onGoBack={()=> navigate('/') } />
            <Toolbar/>

            <div className={styles.content} >
                <div>
                    {suggestions.filter((s)=> s.suggestionStatus=== SUGGESTION_STATUS[1].value)
                        .map((s)=>
                        (<RoadMap type={s.suggestionStatus} suggestion={s}  />))}

                </div>
                <div>
                    {suggestions.filter((s)=> s.suggestionStatus=== SUGGESTION_STATUS[2].value)
                        .map((s)=>
                            (<RoadMap type={s.suggestionStatus} suggestion={s}  />))}

                </div>
                <div>
                    {suggestions.filter((s)=> s.suggestionStatus=== SUGGESTION_STATUS[3].value)
                        .map((s)=>
                            (<RoadMap type={s.suggestionStatus} suggestion={s}  />))}

                </div>

            </div>
        </div>
    );
}

export default RoadmapPage;