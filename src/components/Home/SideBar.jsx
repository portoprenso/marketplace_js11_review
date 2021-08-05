import {
  Radio,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Button,
  Slider,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useProducts } from "../../contexts/ProductContext";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: "20px",
    marginBottom: "20px",
    minWidth: "170px",
    maxWidth: "350px",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const { getProductsData, history } = useProducts()
  const [type, setType] = useState(getType())
  const [price, setPrice] = useState(getPrice())

  function getType(){
    const search = new URLSearchParams(history.location.search)
    return search.get('type')
  }

  function getPrice(){
    const search = new URLSearchParams(history.location.search)
    return search.get('price_lte')
  }

  const handleChangeType = (e) => {
    if(e.target.value == "all"){
      const search = new URLSearchParams(history.location.search)
      search.delete('type')
      history.push(`${history.location.pathname}?${search.toString()}}`)
      getProductsData()
      setType(e.target.value)
      return
    }
    const search = new URLSearchParams(history.location.search)
    search.set('type', e.target.value)
    history.push(`${history.location.pathname}?${search.toString()}`)
    getProductsData()
    setType(e.target.value)
  }

  const handleChangePrice = (e, value) => {
    console.log(value)
    const search = new URLSearchParams(history.location.search)
    search.set('price_lte', value)
    console.log(search)
    history.push(`${history.location.pathname}?${search.toString()}`)
    getProductsData()
    setPrice(value)
  }

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search)
    search.delete('price_lte')
    history.push(`${history.location.pathname}?${search.toString()}`)
    getProductsData()
    setPrice(getPrice())
  }

  return (
    <Grid item md={3}>
      <Paper elevation={2} className={classes.paper}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Brand</FormLabel>
          <RadioGroup value={type} onChange={handleChangeType}>
            <FormControlLabel
              value="iphone"
              control={<Radio />}
              label="iPhone"
            />
            <FormControlLabel
              value="samsung"
              control={<Radio />}
              label="Samsung"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Reset brand"
            />
          </RadioGroup>
        </FormControl>

        <Grid>
          <Slider
          value={price}
          onChange={handleChangePrice}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          />
          <Button onClick={resetPrice} variant="outlined" color="primary">Reset price</Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SideBar;
