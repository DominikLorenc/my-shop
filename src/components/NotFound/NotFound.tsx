import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
const { wrapper } = styles;

export const NotFound = () => {
  return (
    <div className={wrapper}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};
