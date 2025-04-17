import styles from './RoadmapPage.module.css'
import Toolbar from "@/components/Toolbar/Toolbar.tsx";
import PageHeader from "@/components/PageHeader/PageHeader.tsx";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {SuggestionContext} from "@/providers/SuggestionProvider.tsx";
import RoadMap from "@/components/RoadMap/RoadMap.tsx";

function RoadmapPage() {
    const navigate= useNavigate();
   const {suggestions}=useContext(SuggestionContext)
    return (
        <div className={styles.roadmap}>
            <PageHeader onGoBack={()=> navigate('/') } />
            <Toolbar/>

            <div className={styles.content} >
                <div>
                    {suggestions.filter((s)=> s.suggestionType=== 'Planned').map((s)=>
                        (<RoadMap type='Planned' suggestion={s}  />))}

                </div>

            </div>
        </div>
    );
}

export default RoadmapPage;