import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk";
import {
  selectItemAmount,
  isShowCart,
  toggleCart,
  selectCartItems,
  cartTotal,
  clearCart,
} from "../../state/cartSlice";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

import styles from "./styles.module.scss";
import { cx } from "../../utils";
import { CloseSVGIcon } from "../../assets/SVG/CloseSVGIcon";
import { CartItem } from "../CartItem/CartItem";
import { Link } from "react-router-dom";

const {
  wrapperOverlay,
  wrapperCart,
  wrapperCartActive,
  wrapperHeading,
  wrapperCartEmpty,
  wrapperSubtotal,
} = styles;

export const Cart = () => {
  const total = useAppSelector(cartTotal);
  const showCart = useAppSelector(isShowCart);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const itemAmount = useAppSelector(selectItemAmount);
  const isEmpty = cartItems.length === 0;

  const handleClose = () => {
    dispatch(toggleCart());
  };

  useLockBodyScroll(showCart);

  return (
    <Fragment>
      {showCart && <div className={wrapperOverlay} onClick={handleClose}></div>}
      <div className={cx(wrapperCart, showCart && wrapperCartActive)}>
        <div className={wrapperHeading}>
          <h3>Cart ({itemAmount})</h3>
          <div onClick={handleClose}>
            <CloseSVGIcon />
          </div>
        </div>

        {isEmpty ? (
          <div className={wrapperCartEmpty}>Your cart is empty</div>
        ) : (
          <Fragment>
            {cartItems && cartItems.length > 0 && (
              <div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
            <div className={wrapperSubtotal}>
              <div>Subtotal {total.toFixed(2)}</div>
              <button onClick={() => dispatch(clearCart())}>Clear cart</button>
            </div>

            <div>
              <Link to="/">Checkout</Link>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
