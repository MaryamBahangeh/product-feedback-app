import { PropsWithChildren } from "react";

import Button, { Variant } from "@/components/Button/Button.tsx";

import styles from "./PageHeader.module.css";

type Props = PropsWithChildren & {
  onGoBack: () => void;
};

function PageHeader({ onGoBack, children }: Props) {
  return (
    <div className={styles["page-header"]}>
      <Button variant={Variant.TEXT} onClick={onGoBack}>
        <img src="/images/icones/shared/icon-arrow-left.svg" alt="back" />
        Go Back
      </Button>
      {children}
    </div>
  );
}

export default PageHeader;
