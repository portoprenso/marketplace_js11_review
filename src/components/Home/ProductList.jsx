import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { productsData, getProductsData } = useProducts()
  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    console.log(productsData)
  }, [productsData])

  return (
    <Grid container justify="space-around">
      {productsData && productsData
      ?
      (productsData.map(item => <ProductCard item={item}/>))
      :
      <></>}
    </Grid>
  );
};

export default ProductList;