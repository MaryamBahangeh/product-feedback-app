import styles from "./NotFound.module.css";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return <h1 className={styles["not-found"]}>{t("notFound.notFound")}</h1>;
}

export default NotFound;
