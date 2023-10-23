import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
      confirmPassword: e.target["confirmPassword"].value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/api/user/register`,
        user,
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>Register !</h2>

      <form onSubmit={submitHandler}>
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />

        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />

        <input type="submit" value="Register" />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
export default Register;
