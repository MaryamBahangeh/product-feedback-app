import { ComponentProps, ReactElement } from "react";

import { useTranslation } from "react-i18next";

import { DropdownOption } from "@/models/dropdown-type.ts";

import styles from "./Select.module.css";

type Props = ComponentProps<"select"> & {
  options: DropdownOption[];
};

export default function Select({
  options,
  ...otherProps
}: Props): ReactElement {
  const { t } = useTranslation();

  return (
    <select className={styles.select} {...otherProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {t(option.translationKey as any)}
        </option>
      ))}
    </select>
  );
}
