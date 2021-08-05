import { Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { getCurrentPage } from '../../helpers/functions';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { productsData, getProductsData, pages } = useProducts();
  const [page, setPage] = useState(getCurrentPage());
  const history = useHistory();
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page]);

  const handlePage = (e, page) => {
    const search = new URLSearchParams(window.location.search);
    search.set('_page', page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProductsData();
    setPage(page);
  };
  return (
    <>
      <Grid container spacing={6}>
        {productsData ? (
          productsData.map((item) => (
            <Grid item>
              <ProductCard item={item} key={item.id} />
            </Grid>
          ))
        ) : (
          <>
            <h1>...loading</h1>
          </>
        )}
      </Grid>
      <div style={{ margin: '20px auto' }}>
        <Pagination count={pages} color="primary" page={+page} onChange={handlePage} />
      </div>
    </>
  );
};

export default ProductList;
