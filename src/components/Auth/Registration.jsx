import { Container, Grid, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useAuth } from './../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import MuiAlert from '@material-ui/lab/Alert';
import { useEffect } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Registration = () => {
  const [newUser, setNewUser] = useState({});
  const { registerUser, user, loading, errorMessage, success, clearState } = useAuth();
  const history = useHistory();

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjYxMGEzMjFjYmQ4ZjQwMDAxNWU5OGFkNiIsImlkIjoicXdlcnR5QG1haWwucnUiLCJpYXQiOjE2MjgwNTgxNDAsImV4cCI6MTYyODE0NDU0MH0.Ix_rzj7fxI6IjudBTcWD5xD_0V4KWcLQgtaJMmpofdw"
  // useEffect(() => {
  //   console.log(jwt_decode(token))
  // }, [])

  const handleChange = (e) => {
    let newObj = {
      ...newUser,
    };
    newObj[e.target.name] = e.target.value;
    setNewUser(newObj);
  };

  const signup = (e) => {
    e.preventDefault();
    try {
      registerUser(newUser);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (success) {
      history.push('/login');
    }

    return () => {
      clearState();
    };
  }, [success]);

  // useEffect(() => {
  //   if (user) {
  //     history.push('/');
  //   }
  // }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <form action="" onSubmit={signup}>
        <Grid container>
          <div>
            <Typography component="h1" variant="h5">
              Registration
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
            {loading ? <CircularProgress /> : 'Sign Up'}
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Registration;
