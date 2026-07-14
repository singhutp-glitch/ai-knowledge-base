import React, { useState } from "react";
import { registerUser } from "../../services/authApi";

const RegisterPage = ({setAuthMode}) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

async function handleSubmit(e) {
e.preventDefault();

setError("");

if (name.trim().length < 2) {
  setError("Name must be at least 2 characters long");
  return;
}

if (!email.includes("@")) {
  setError("Please enter a valid email");
  return;
}

if (password.length < 6) {
  setError("Password must be at least 6 characters long");
  return;
}


const data = await registerUser(name,email,password);

setAuthMode('login');

}

return ( <div> <h1>Create Account</h1>

  {error && <p>{error}</p>}

  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button type="submit">
      Register
    </button>
  </form>
  <button onClick={()=>{setAuthMode('login')}}>Login here</button>
</div>

);
};

export default RegisterPage;
