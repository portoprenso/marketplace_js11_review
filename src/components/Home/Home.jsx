import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductList from './ProductList';
import SideBar from './SideBar';

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
      <Grid container spacing-md={3} spacing-sm={3}>
        <SideBar />
        <ProductList />
      </Grid>
    </div>
  );
};

export default Home;