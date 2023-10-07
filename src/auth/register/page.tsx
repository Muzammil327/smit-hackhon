import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../assets/config/firebase-config";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    if (!name) {
      setErrorMessage("Name are Required.");
      return;
    }
    if (!email) {
      setErrorMessage("Email are Required.");
      return;
    }
    if (!password) {
      setErrorMessage("Password are Required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("userCredential:", userCredential);

      if (userCredential && auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      } else {
        setErrorMessage("An error occurred during registration.");
      }
      navigate("/auth/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(
          "Email is already in use. Please use a different email."
        );
        return;
      }
      if (error.code === "auth/weak-password") {
        setErrorMessage("passowrd must be 6 character.");
        return;
      } else {
        console.log("Error registering user:", error);
        setErrorMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <section className="form-control">
      <div className="image">
        <img
          src="https://source.unsplash.com/random"
          alt="Login"
          title="Login"
        />
      </div>
      <div className="form">
        <div className="inner">
          <h1 className="text-5xl">Register Account</h1>
          <p>Hi, Welcome </p>
          {errorMessage}
          <div className="form-inner">
            <div>
              {/* name */}
              <div>
                <label className="form-label" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="input-control"
                  type="name"
                  name="name"
                  id="name"
                  placeholder="name@company.com"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* email */}
              <div>
                <label className="form-label" htmlFor="email">
                  Your Email
                </label>
                <input
                  className="input-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* password */}
              <div>
                <label className="form-label" htmlFor="password">
                  Your Password
                </label>
                <input
                  className="input-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button onClick={handleSignup} type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Register</span>
            </button>
          </div>
          <hr />
          <div className="oauth">
            <button>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Login with Google"
                title="Login with Google"
              />
              <span>Register with Google</span>
            </button>
          </div>
          <p>
            Need an account?
            <Link to="/auth/login">Login Account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
