import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../assets/config/firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignup = async () => {
    if (!email) {
      setErrorMessage("Email are Required.");
      return;
    }
    if (!password) {
      setErrorMessage("Password are Required.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // User login successfully
      navigate("/auth/dashboard");
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        setErrorMessage("Invalid Credential.");
        return;
      } 
      if (error.code === "auth/missing-password") {
        setErrorMessage("Missing Password.");
      } else {
        console.error("Error registering user:", error.code);
        setErrorMessage("Invalid Login.");
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
          <h1 className="text-5xl">Login Account</h1>
          <p>Hi, Welcome Again👋</p>
          {errorMessage}
          <div className="form-inner">
            <div>
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
              <span>Login</span>
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
              <span>Login with Google</span>
            </button>
          </div>
          <p>
            Need an account?
            <Link href="/auth/register">Create Account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
