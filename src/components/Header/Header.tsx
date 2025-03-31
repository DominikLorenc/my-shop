import bag from "../../assets/SVG/bag.svg";
import styles from "./styles.module.scss";
import { cx } from "../../utils";
import { useAppSelector, useAppDispatch } from "../../hooks/rtk";
import {
  selectItemAmount,
  toggleCart,
  cartError,
  clearCartError,
} from "../../state/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const { wrapper, wrapperBag, wrapperBagActive, wrapperBagIndicator } = styles;

export const Header = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const cartErrorMessage = useAppSelector(cartError);
  const dispatch = useAppDispatch();
  const isItemOnCart = itemAmount > 0;

  useEffect(() => {
    if (!cartErrorMessage) return;

    alert(cartErrorMessage);
    dispatch(clearCartError());

    return () => {
      dispatch(clearCartError());
    };
  }, [cartErrorMessage, dispatch]);

  return (
    <header className={wrapper}>
      <Link to="/">My shop </Link>
      <button
        onClick={() => dispatch(toggleCart())}
        className={cx(wrapperBag, isItemOnCart && wrapperBagActive)}
      >
        <img src={bag} alt="bag" loading="lazy" width="30" height="30" />
        <span className={wrapperBagIndicator}>{itemAmount}</span>
      </button>
    </header>
  );
};
