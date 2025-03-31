import { useEffect } from "react";
import { fetchProducts, products } from "../../state/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk";

import { Product } from "../../components/Product/Product";
import { Pagination } from "../../components/Pagination/Pagination";
import { Loading } from "../../components/Loading/Loading";
import { Error } from "../../components/Error/Error";

import { usePagination } from "../../hooks/usePagination";

import styles from "./styles.module.scss";
const { wrapper, wrapperProducts, wrapperTitle } = styles;

export const Home = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(products);
  const { paginatedItems, currentPage, totalPages, setPage } = usePagination(
    items,
    8
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={wrapper}>
      <h1 className={wrapperTitle}>Products</h1>
      <div className={wrapperProducts}>
        {paginatedItems.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};
