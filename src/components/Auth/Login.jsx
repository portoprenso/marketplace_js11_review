import { Container, Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './../../contexts/AuthContext';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [newUser, setNewUser] = useState({});
  const history = useHistory();
  const { loginUser, user, loading, errorMessage, clearState } = useAuth();

  const handleChange = (e) => {
    let newObj = {
      ...newUser,
    };
    newObj[e.target.name] = e.target.value;
    setNewUser(newObj);
  };

  const signin = (e) => {
    e.preventDefault();
    try {
      loginUser(newUser);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }

    return () => {
      clearState();
    };
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <form action="" onSubmit={signin}>
        <Grid container>
          <div>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
          </div>
          <Grid>
            <TextField
              onChange={(e) => handleChange(e)}
              name="email"
              variant="outlined"
              required
              label="Email Address"
            />
            <TextField onChange={(e) => handleChange(e)} name="password" variant="outlined" required label="Password" />
            <TextField variant="outlined" required label="Password again" />
          </Grid>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress /> : 'Login'}
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
