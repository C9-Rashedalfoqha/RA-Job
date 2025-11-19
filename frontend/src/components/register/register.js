import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    first,
    setFirst,
    last,
    setLast,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    experience,
    setExperience,
    skill,
    setSkill,
  } = useContext(userContext);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    setIsLoading(true);
    setError(null);

    axios
      .post("https://r-a-jobsearch.onrender.com/register", {
        FirstName: first,
        lastName: last,
        Email: email,
        password: password,
        phoneNumber: phoneNumber,
        Experience: experience,
        Skills: skill,
      })
      .then((result) => {
        console.log(result.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Join RA Job
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-ink">
              Create your profile
            </h1>
            <p className="mt-4 text-sm text-ink-softer">
              Share your experience so we can match you with curated job
              opportunities and streamline your hiring journey.
            </p>
            <div className="mt-8 space-y-4 text-sm text-ink-soft">
              <p>• Showcase your skills to top employers</p>
              <p>• Track applications with a personalized dashboard</p>
              <p>• Receive curated alerts based on your preferences</p>
            </div>
          </div>

          <form className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink">
                First Name
                <input
                  type="text"
                  id="formFirstName"
                  className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
                  placeholder="Rashed"
                  minLength={3}
                  maxLength={20}
                  onChange={(e) => setFirst(e.target.value)}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-ink">
                Last Name
                <input
                  type="text"
                  id="formLastName"
                  className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
                  placeholder="Alfoqha"
                  minLength={3}
                  maxLength={20}
                  onChange={(e) => setLast(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-ink">
              Email
              <input
                type="email"
                id="formEmail"
                className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
                placeholder="you@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="block text-sm font-semibold text-ink">
              Password
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-3 focus-within:border-brand focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/20">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="formPassword"
                  className="w-full border-none bg-transparent py-2 font-medium text-ink focus:outline-none"
                  placeholder="Minimum 8 characters"
                  minLength={8}
                  maxLength={50}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="text-sm font-semibold text-brand"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink">
                Phone Number
                <input
                  type="tel"
                  id="formPhoneNumber"
                  className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
                  placeholder="07XXXXXXXX"
                  minLength={10}
                  maxLength={15}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-ink">
                Experience
                <input
                  type="text"
                  id="formExperience"
                  className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
                  placeholder="3+ years frontend"
                  onChange={(e) => setExperience(e.target.value)}
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-ink">
              Skills & Qualifications
              <input
                type="text"
                id="formSkills"
                className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/30"
                placeholder="React, Node.js, UI/UX"
                onChange={(e) => setSkill(e.target.value)}
              />
            </label>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="button"
              className="w-full rounded-2xl bg-ink px-4 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-slate-400"
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-ink-soft">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-brand hover:text-brand-dark">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
