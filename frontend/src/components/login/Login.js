import axios from "axios";
import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken, setIsLoggedIn, setUserId, setUserPersonal } =
    useContext(userContext);
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const token = credentialResponse.credential;
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleGoogleLoginError = () => {
    setError("Google login failed");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const loginUser = (email, password) => {
    axios
      .post("https://ra-job.onrender.com/register/login", {
        Email: email,
        password: password
      })
      .then((result) => {
        const token = result.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        const userId = result.data.userId;
        localStorage.setItem("userId", userId);
        setUserId(userId);
        const user = result.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUserPersonal(user);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setError("Login failed. Please check your email or password.");
      });
  };

  const handleGuestLogin = () => {
    const guestEmail = "rashed11@gmail.com";
    const guestPassword = "123";
    loginUser(guestEmail, guestPassword);
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-10">
      <form
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100"
        id="login"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Welcome back
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink">
            Sign in to RA Job
          </h2>
          <p className="mt-2 text-sm text-ink-softer">
            Access tailored job matches and hiring tools
          </p>
        </div>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              id="email"
              className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/60 text-ink shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Password</span>
            <input
              type="password"
              id="password"
              className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/60 text-ink shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-dark"
          >
            Sign In
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-ink shadow-sm hover:border-brand/40"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Or
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Need an account?{" "}
          <Link to="/register" className="font-semibold text-brand hover:text-brand-dark">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
