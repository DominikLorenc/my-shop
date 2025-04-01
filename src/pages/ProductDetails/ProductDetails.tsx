import styles from "./styles.module.scss";

import { useProductDetails } from "./hooks";
import { Loading } from "../../components/Loading/Loading";
import { Error } from "../../components/Error/Error";

import { cx } from "../../utils";

const {
  wrapper,
  wrapperErrorMessage,
  wrapperImage,
  wrapperProductDetails,
  wrapperQuantity,
  wrapperQuantityError,
} = styles;

export const ProductDetails = () => {
  const {
    product,
    loading,
    error,
    amount,
    errorQuantity,
    handleOnChange,
    handleOnBlur,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
  } = useProductDetails();

  if (loading) return <Loading />;
  if (!product || error) return <Error message={"Product not found"} />;

  const { title, image, price, availableQuantity, description } = product;
  const buttonDisabled =
    availableQuantity <= 0 || Number(amount) > availableQuantity;

  return (
    <div className={wrapper}>
      <div className={wrapperImage}>
        <img src={image} alt={title} />
      </div>
      <div className={wrapperProductDetails}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{price.toFixed(2)}</p>
        <div>
          <button onClick={handleDecrement} disabled={Number(amount) <= 1}>
            -
          </button>
          <input
            value={amount}
            type="text"
            inputMode="numeric"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            className={cx(
              wrapperQuantity,
              errorQuantity && wrapperQuantityError
            )}
          />
          <button onClick={handleIncrement} disabled={buttonDisabled}>
            +
          </button>
          <button disabled={buttonDisabled} onClick={handleAddToCart}>
            {availableQuantity === 0 ? "Sold out" : "Add to cart"}
          </button>
          {errorQuantity && (
            <p className={wrapperErrorMessage}>{errorQuantity}</p>
          )}
          <p>Available quantity: {availableQuantity}</p>
        </div>
      </div>
    </div>
  );
};
