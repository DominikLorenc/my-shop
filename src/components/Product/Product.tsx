import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/rtk";
import { addToCart } from "../../state/cartSlice";

import { AddToCartSVG } from "../../assets/SVG/AddToCartSVG";

import type { Product as ProductType } from "../../types/Product";

import styles from "./styles.module.scss";
const { wrapper, wrapperImage, wrapperProductDetails, wrapperAddToCart } =
  styles;

export const Product = ({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();
  const { id, image, title, price, availableQuantity } = product;

  const buttonDisabled = availableQuantity <= 0;

  return (
    <div className={wrapper}>
      <Link to={`/product/${id}`}>
        <div className={wrapperImage}>
          <img src={image} alt={product.title} />
        </div>
      </Link>

      <div className={wrapperProductDetails}>
        <h2>{title}</h2>
        <p>{price.toFixed(2)}</p>
        <button
          disabled={buttonDisabled}
          onClick={() => dispatch(addToCart(product))}
        >
          {buttonDisabled ? (
            "Sold out"
          ) : (
            <div className={wrapperAddToCart}>
              <AddToCartSVG /> Add to cart
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
