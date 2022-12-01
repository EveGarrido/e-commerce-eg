import axios from 'axios';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
      .then((res) => {
        navigate('/')
        console.log(res)
        localStorage.setItem('token', res.data.data.token)
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          swal({
            title: "Invalid Credentials",
            icon: "warning",
            timer: 2000
          });
        } else {
          console.log(error.response?.data);
        }
      })
  }

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      style={{ maxWidth: 500, margin: "0 auto" }}>

      <h1 style={{ color: 'yellowgreen' }}>Login</h1>
      <p style={{ color: 'yellowgreen' }}>Please, enter your credentials to continue</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register('email')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register('password')}
        />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ backgroundColor: 'yellowgreen', border: 'none', color: 'grey' }}>
        Submit
      </Button>
    </Form>
  );
};

export default Login;