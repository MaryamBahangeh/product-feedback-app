import { ChangeEvent, ComponentProps } from "react";
import styles from "./Textarea.module.css";

type Props = ComponentProps<"textarea"> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea({ value, onChange, ...rest }: Props) {
  return (
    <textarea
      className={styles.textarea}
      rows={3}
      value={value}
      onChange={onChange}
      maxLength={255}
      {...rest}
    ></textarea>
  );
}

export default Textarea;
