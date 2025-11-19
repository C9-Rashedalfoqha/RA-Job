import { Route, Routes, useNavigate } from "react-router-dom";

import Register from "./components/register/register";
import Login from "./components/login/Login";
import { createContext, useState } from "react";
import JobPost from "./components/jobPost/jobPost";
import Nav from "./components/NavBar/nav";
import JobRender from "./components/JobRender/JobRender";
import Personal from "./components/PersonalPage/Personal";
import Post from "./components/post/Post";
import JobDetails from "./components/oneJob/JobDetails";
import User from "./components/users/User";
import About from "./components/about page/About";

export const userContext = createContext();
function App() {
  const [UserDetail, setUserDetail] = useState("");
  const [JobDetail, setJobDetail] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userPersonal, setUserPersonal] = useState(() => {
    const storageUserPersonal = localStorage.getItem("user");
    try { 
      return JSON.parse(storageUserPersonal) || {};
    } catch (error) {
      console.error("Error parsing userPersonal:", error);
      return {};
    }
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [post, setPost] = useState([]);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [skill, setSkill] = useState("");
  const [filter, setFilter] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [dashBoard, setDashBoard] = useState([]);
  const filteredJobs = dashBoard.filter((elem) =>
    elem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();
  const logout = () => {
    setToken("");
    setUserId("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <userContext.Provider
        value={{
          logout,
          filteredJobs,
          searchTerm,
          setSearchTerm,
          setToken,
          token,
          isLoggedIn,
          setIsLoggedIn,
          setUserId,
          userId,
          userPersonal,
          setUserPersonal,
          filter,
          setFilter,
          job,
          setJob,
          address,
          setAddress,
          description,
          setDescription,
          salary,
          setSalary,
          image,
          setImage,
          url,
          setUrl,
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
          post,
          setPost,
          JobDetail,
          setJobDetail,
          UserDetail,
          setUserDetail,
          dashBoard,
          setDashBoard
        }}
      >
        <div className="min-h-screen bg-slate-50 text-ink">
          <Nav />
          <main className="mx-auto max-w-6xl px-4 pb-10 pt-6">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route
                path="/job"
                exact
                element={isLoggedIn ? <JobRender /> : <Login />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={token ? <Post /> : <Login />} />
              <Route
                path="/login"
                element={isLoggedIn ? <Personal /> : <Login />}
              />
              <Route path="/newJob" element={<JobPost />} />
            </Routes>
          </main>
        </div>
      </userContext.Provider>
    </>
  );
}

export default App;
