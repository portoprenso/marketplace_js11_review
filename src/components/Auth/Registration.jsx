import { Container, Grid, TextField, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from './../../contexts/AuthContext';
import jwt_decode from 'jwt-decode';

const Registration = () => {
  const [newUser, setNewUser ] = useState({})
  const { registerUser } = useAuth()

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjYxMGEzMjFjYmQ4ZjQwMDAxNWU5OGFkNiIsImlkIjoicXdlcnR5QG1haWwucnUiLCJpYXQiOjE2MjgwNTgxNDAsImV4cCI6MTYyODE0NDU0MH0.Ix_rzj7fxI6IjudBTcWD5xD_0V4KWcLQgtaJMmpofdw"
  // useEffect(() => {
  //   console.log(jwt_decode(token))
  // }, [])

  const handleChange = (e) => {
    let newObj = {
      ...newUser
    }
    newObj[e.target.name] = e.target.value
    setNewUser(newObj)
  }

  return (
    <Container component="main" maxWidth="xs">
      <form action="" onSubmit={(e) => registerUser(e, newUser)}>
        <Grid container>
          <Typography component="h1" variant="h5">
            Registration
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
            <TextField
            variant="outlined"
            required
            label="Password again"
            />
          </Grid>
          <Button
          variant="contained"
          color="primary"
          type="submit"
          >
            Sign up
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Registration;