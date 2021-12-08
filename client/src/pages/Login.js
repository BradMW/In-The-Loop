import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import swal from 'sweetalert';



const displayName = localStorage.getItem("username");

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  console.log(login, { error });
  console.log('create data');

  const handleFormSubmit = async (event) => {
    console.log('default??')
    event.preventDefault();
    console.log('submit')
    try {
      const mutationResponse = await login({
        variables: { ...formState },
      });
      const token = mutationResponse.data.login.token;
      localStorage.setItem("username", `${mutationResponse.data.login.user.username}`);
      console.log(mutationResponse);
      console.log(token);
      Auth.login(token);
      

    } catch (e) {
      console.log(e);
      swal("Login failed please check your Email or Password.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                > Submit
                  {/* the button can't link to dashboard or it executes without a login */}
                
                </button>
              </form>
  )};

export default Login;
