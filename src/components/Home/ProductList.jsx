import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { productsData, getProductsData } = useProducts();
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    console.log(productsData);
  }, [productsData]);

  return (
    <Grid container spacing={6}>
      {productsData ? (
        productsData.map((item) => (
          <Grid item>
            <ProductCard item={item} />
          </Grid>
        ))
      ) : (
        <>
          <h1>...loading</h1>
        </>
      )}
    </Grid>
  );
};

export default ProductList;
