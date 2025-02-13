import { ComponentProps, ReactElement } from "react";

import { useTranslation } from "react-i18next";

import styles from "./Select.module.css";
import { DropdownOption } from "@/models/dropdown-type.ts";

type Props = ComponentProps<"select"> & {
  options: DropdownOption[];
  onDropdownChange: (option: DropdownOption) => void;
};

export default function Select({
  options,
  onDropdownChange,
}: Props): ReactElement {
  const { t } = useTranslation();
  return (
    <select
      className={styles.select}
      onChange={(e) =>
        onDropdownChange({
          translationKey: e.target.name,
          value: e.currentTarget.value,
        })
      }
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {t(option.translationKey)}
        </option>
      ))}
    </select>
  );
}
