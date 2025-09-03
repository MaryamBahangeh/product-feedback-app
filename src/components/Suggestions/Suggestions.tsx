import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SearchContext } from "@/providers/SearchProvider.tsx";

import Suggestion from "./Suggestion/Suggestion.tsx";

import styles from "./Suggestions.module.css";

import clsx from "clsx";

import SuggestionSkeleton from "@/components/Skeleton/SuggestionSkeleton/SuggestionSkeleton.tsx";

type Props = {
  className?: string;
  isLoading: boolean;
};

function Suggestions({ className, isLoading }: Props) {
  const { filteredSuggestions } = useContext(SearchContext);

  return (
    <ul className={clsx(styles.suggestions, className)}>
      <AnimatePresence>
        {filteredSuggestions.map((suggestion) => (
          <motion.div
            layout
            key={suggestion.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="card"
          >
            <li>
              {isLoading ? (
                <SuggestionSkeleton />
              ) : (
                <Suggestion suggestion={suggestion} />
              )}
            </li>
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default Suggestions;
