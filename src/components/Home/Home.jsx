import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductList from './ProductList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  }
}));

const Home = () => {

  const classes = useStyles()
  const { getCart, cart } = useProducts()

  useEffect(() => {
    getCart()
  }, [])

  // useEffect(() => {
  //   console.log(cart)
  // }, [cart])

  return (
    <div className={classes.root}>
      <ProductList />
    </div>
  );
};

export default Home;