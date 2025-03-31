import { CloseSVGIcon } from "../../assets/SVG/CloseSVGIcon";
import type { CartItem as CartItemType } from "../../types/CartItem";
import {
  addToCart,
  removeFromCart,
  decreaseAmount,
  toggleCart,
} from "../../state/cartSlice";
import { useAppDispatch } from "../../hooks/rtk";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const {
  wrapper,
  wrapperImage,
  wrapperDetails,
  wrapperTitle,
  wrapperPrice,
  wrapperQuantity,
  wrapperRemove,
} = styles;

export const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useAppDispatch();

  const { id, title, image, price, amount } = item;

  const handleCloseCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div className={wrapper}>
      <div className={wrapperImage}>
        <Link onClick={handleCloseCart} to={`/product/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>

      <div className={wrapperDetails}>
        <div className={wrapperTitle}>
          <Link onClick={handleCloseCart} to={`/product/${id}`}>
            <h3>{title}</h3>{" "}
          </Link>
          <span
            className={wrapperRemove}
            onClick={() => dispatch(removeFromCart(id))}
          >
            <CloseSVGIcon />
          </span>
        </div>
        <div className={wrapperPrice}>
          <div className={wrapperQuantity}>
            <span onClick={() => dispatch(decreaseAmount(id))}>-</span>
            <p>{amount}</p>
            <span onClick={() => dispatch(addToCart(item))}>+</span>
          </div>
          <div>{price.toFixed(2)}</div>
          <div>{(price * amount).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
