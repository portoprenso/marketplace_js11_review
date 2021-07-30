import { makeStyles } from '@material-ui/core';
import React from 'react';
import ProductList from './ProductList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  }
}));

const Home = () => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ProductList />
    </div>
  );
};

export default Home;