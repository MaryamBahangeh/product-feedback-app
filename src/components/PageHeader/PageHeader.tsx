import { PropsWithChildren } from "react";

import Button, { Variant } from "@/components/Button/Button.tsx";

import styles from "./PageHeader.module.css";
import { useTranslation } from "react-i18next";

type Props = PropsWithChildren & {
  onGoBack: () => void;
};

function PageHeader({ onGoBack, children }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles["page-header"]}>
      <Button variant={Variant.TEXT} onClick={onGoBack}>
        <img src="/images/icones/shared/icon-arrow-left.svg" alt="back" />
        {t("pageHeader.goBack")}
      </Button>
      {children}
    </div>
  );
}

export default PageHeader;
