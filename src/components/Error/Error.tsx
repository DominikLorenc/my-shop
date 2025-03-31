import type { ErrorProps } from "./types";

import styles from "./styles.module.scss";

const { wrapper } = styles;

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className={wrapper}>
      <p>{message || "Something went wrong"}</p>
    </div>
  );
};
