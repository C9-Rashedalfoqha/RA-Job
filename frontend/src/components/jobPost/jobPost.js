import axios from "axios";
import React, { useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const navigate = useNavigate();
  const {
    token,
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
  } = useContext(userContext);

  const uploadImage = () => {
    console.log(image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");

    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((data) => {
        setUrl(data.data.url);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Share a new opportunity
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">
            Create a job post
          </h1>
          <p className="mt-2 text-sm text-ink-softer">
            Fill in the details so candidates understand the role, location and
            salary expectations.
          </p>
        </div>

        <div className="space-y-5">
          <label className="block text-sm font-semibold text-ink">
            Seniority
            <select
              id="position"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select seniority level
              </option>
              <option value="1">Trainee</option>
              <option value="2">Junior</option>
              <option value="3">Middle</option>
              <option value="4">Senior</option>
              <option value="5">Team Leader</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-ink">
            Job title
            <input
              id="jobName"
              placeholder="Full Stack Engineer"
              type="text"
              className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/20"
              onChange={(e) => {
                setJob(e.target.value);
              }}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Location
            <input
              id="jobAddress"
              placeholder="Amman, Jordan"
              type="text"
              className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/20"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-ink">
              Salary (USD)
              <input
                id="salary"
                placeholder="1200"
                type="number"
                className="mt-2 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/20"
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Description
              <textarea
                id="description"
                placeholder="Share responsibilities, tech stack, culture..."
                className="mt-2 h-28 w-full rounded-2xl border-slate-200 bg-slate-50/70 shadow-sm focus:border-brand focus:bg-white focus:ring-brand/20"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-ink">
            Cover image
            <input
              type="file"
              id="fileInput"
              className="mt-2 w-full rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm font-medium text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-brand hover:border-brand/40"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </label>

          {image && (
            <button
              className="w-full rounded-2xl border border-brand/30 bg-white px-4 py-3 text-sm font-semibold text-brand shadow-sm transition hover:bg-brand/10"
              onClick={uploadImage}
              type="button"
            >
              Upload image
            </button>
          )}

          {url && (
            <button
              className="w-full rounded-2xl bg-brand px-4 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-brand-dark"
              onClick={() => {
                axios
                  .post(
                    "https://ra-job.onrender.com/job",
                    {
                      filterTitle: filter,
                      title: job,
                      jobAddress: address,
                      description: description,
                      salary: salary,
                      photo: url,
                    },
                    {
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((result) => {
                    console.log(result);
                    navigate("/job");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              type="button"
            >
              Publish job
            </button>
          )}

          {url && (
            <img
              src={url}
              alt="Uploaded Job"
              className="mt-4 w-full rounded-2xl object-cover shadow-sm"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default JobPost;
