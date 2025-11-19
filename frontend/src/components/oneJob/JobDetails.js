import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { userContext } from "../../App";
import { IoSendSharp } from "react-icons/io5";
import emailjs from "emailjs-com";

const JobDetails = () => {
  const { token, userPersonal } = useContext(userContext);
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Apply, setApply] = useState(false);

  const apply = () => {
    const serviceId = "service_mtmz6jf";
    const templateId = "template_05hqb17";
    const userId = "znH3jKlhlPReHMYZa";
    const templateParams = {
      to_email: "rashedmohammadalfoqha@gmail.com",
      from_name: `${userPersonal.Email}`,
      message: ` "I am applying for the job.",
      Name:${userPersonal.FirstName},
      skills:${userPersonal.Skills}
      ,Experience:${userPersonal.Experience}
      phoneNumber:${userPersonal.phoneNumber}`
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://r-a-jobsearch.onrender.com/job/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setJobDetails(result.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, token]);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
          </div>
        )}
        {!loading && jobDetails && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
              <img
                src={
                  jobDetails.photo ||
                  "https://images.pexels.com/photos/4439454/pexels-photo-4439454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                className="h-full w-full object-cover"
                alt="Job"
              />
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                Open role
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink">
                {jobDetails.title}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50/60 p-4">
                  <p className="text-xs uppercase tracking-widest text-ink-softer">
                    Location
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink">
                    {jobDetails.jobAddress}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50/60 p-4">
                  <p className="text-xs uppercase tracking-widest text-ink-softer">
                    Salary
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink">
                    ${jobDetails.salary}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-base leading-relaxed text-ink-soft">
                <p className="font-semibold text-ink">About the role</p>
                <p>{jobDetails.description}</p>
              </div>
              <button
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3 font-semibold text-white shadow-soft hover:bg-brand-dark"
                onClick={() => {
                  apply();
                  setApply(true);
                }}
              >
                <IoSendSharp />
                Apply now
              </button>
              {Apply && (
                <p className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  Application sent! Keep an eye on your inbox for the hiring
                  team's reply.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDetails;
