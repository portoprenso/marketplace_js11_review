import { Container, Grid, Typography, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";

const Login = () => {
  const [newUser, setNewUser] = useState({});
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    let newObj = {
      ...newUser,
    };
    newObj[e.target.name] = e.target.value;
    setNewUser(newObj);
  };

  return (
    <Container component="main" maxWidth="xs">
      <form action="" onSubmit={(e) => loginUser(e, newUser)}>
        <Grid container>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Grid>
            <TextField
              onChange={(e) => handleChange(e)}
              name="email"
              variant="outlined"
              required
              label="Email Address"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              name="password"
              variant="outlined"
              required
              label="Password"
            />
            <TextField variant="outlined" required label="Password again" />
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
