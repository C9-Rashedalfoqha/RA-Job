import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";

const Personal = () => {
  const [update, setUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  const {
    userPersonal,
    setUserPersonal,
    first,
    setFirst,
    last,
    setLast,
    email,
    setEmail,
    password,
    phoneNumber,
    setPhoneNumber,
    experience,
    setExperience,
    skill,
    setSkill,
    token,
    setJobDetail
  } = useContext(userContext);

  const userId = userPersonal?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;
        const result = await axios.get(
          `https://ra-job.onrender.com//job/user/${userId}`
        );
        setUserPosts(result.data.job);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!image) return;

    const upload = async () => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "wq8dmxe2");
      data.append("cloud_name", "duanrnkmq");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`,
          data
        );
        setUrl(response.data.url);
      } catch (err) {
        console.log(err);
      }
    };

    upload();
  }, [image]);

  const updateData = async () => {
    try {
      const result = await axios.put(
        `https://ra-job.onrender.com//register/update/${userId}`,
        {
          FirstName: first,
          lastName: last,
          Email: email,
          password: password,
          phoneNumber: phoneNumber,
          Experience: experience,
          Skills: skill,
          photo: url,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUserPersonal({ ...userPersonal, ...result.data.result });
    } catch (err) {
      console.log(err.message);
    }
    setUpdate(false);
  };

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
          <div className="rounded-3xl bg-white shadow-soft ring-1 ring-slate-100">
            {userPersonal.photo && (
              <img
                src={userPersonal.photo}
                alt="User"
                className="h-56 w-full rounded-t-3xl object-cover"
              />
            )}
            <div className="space-y-4 px-6 py-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                  Profile
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                  {userPersonal.FirstName} {userPersonal.lastName}
                </h2>
              </div>

              <div className="space-y-3 text-sm text-ink">
                <p className="font-semibold text-ink-soft">
                  {userPersonal.Email}
                </p>
                <p className="text-ink-soft">{userPersonal.phoneNumber}</p>
                <p className="text-ink-soft">
                  Experience: {userPersonal.Experience || "N/A"}
                </p>
                <p className="text-ink-soft">
                  Skills: {userPersonal.Skills || "N/A"}
                </p>
              </div>

              {update && (
                <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-sm font-semibold text-ink-softer hover:border-brand/40">
                  Update photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </label>
              )}

              <div className="space-y-3">
                {update && (
                  <>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="First Name"
                      value={first || userPersonal.FirstName || ""}
                      onChange={(e) => setFirst(e.target.value)}
                    />
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Last Name"
                      value={last || userPersonal.lastName || ""}
                      onChange={(e) => setLast(e.target.value)}
                    />
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Email"
                      value={email || userPersonal.Email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Phone Number"
                      value={phoneNumber || userPersonal.phoneNumber || ""}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Experience"
                      value={experience || userPersonal.Experience || ""}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Skills"
                      value={skill || userPersonal.Skills || ""}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </>
                )}
              </div>

              <button
                className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
                onClick={() => {
                  if (update) {
                    updateData();
                  }
                  setUpdate(!update);
                }}
                type="button"
              >
                {update ? "Save profile" : "Edit profile"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {userPosts.map((post) => (
              <article
                key={post._id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                {post.photo && (
                  <Link
                    to={`/job/${post._id}`}
                    onClick={() => {
                      setJobDetail(post._id);
                    }}
                  >
                    <img
                      src={post.photo}
                      alt={post.title}
                      className="h-64 w-full object-cover"
                    />
                  </Link>
                )}

                <div className="space-y-3 px-6 py-5">
                  <Link
                    to={`/job/${post._id}`}
                    onClick={() => {
                      setJobDetail(post._id);
                    }}
                    className="font-display text-2xl font-semibold text-ink"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-ink-soft">
                    Job Address: {post.jobAddress}
                  </p>
                  <p className="text-sm text-ink-soft">
                    Description: {post.description}
                  </p>
                  <p className="text-sm text-ink-soft">
                    Salary: {post.salary}
                  </p>
                  {post.comments && post.comments.length > 0 && (
                    <div className="rounded-2xl bg-slate-50/70 p-4">
                      <h6 className="text-sm font-semibold text-ink">
                        Comments
                      </h6>
                      <ul className="mt-2 space-y-2 text-sm text-ink-soft">
                        {post.comments.map((comment) => (
                          <li key={comment._id}>{comment.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personal;
