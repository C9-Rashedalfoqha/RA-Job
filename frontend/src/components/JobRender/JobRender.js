import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsFillSendPlusFill } from "react-icons/bs";
import { userContext } from "../../App";

const JobRender = () => {
  const {
    setJobDetail,
    setUserDetail,
    dashBoard,
    setDashBoard,
    filteredJobs,
    searchTerm,
  } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.URL_SERVER}/job`)
      .then((result) => {
        setDashBoard(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [setDashBoard]);

  const jobsToRender =
    searchTerm && searchTerm.trim().length > 0 ? filteredJobs : dashBoard;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Explore openings
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-ink">
              Featured roles
            </h1>
            {searchTerm && (
              <p className="text-sm text-ink-softer">
                Showing {jobsToRender.length} matches for “{searchTerm}”
              </p>
            )}
          </div>
          <Link
            to="/newJob"
            className="inline-flex items-center gap-2 rounded-2xl bg-ink px-4 py-2 font-semibold text-white shadow-soft transition hover:bg-ink/90"
          >
            <BsFillSendPlusFill />
            Create Job
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {jobsToRender.map((elem) => (
              <article
                key={elem?._id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-center gap-3 px-6 py-4">
                  <Link
                    to={`/user/${elem.userId._id}`}
                    onClick={() => setUserDetail(elem.userId._id)}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={
                        elem?.userId?.photo ||
                        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
                      }
                      className="h-12 w-12 rounded-full object-cover"
                      alt="User Profile"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {elem?.userId.FirstName} {elem?.userId.lastName}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-ink-softer">
                        Hiring manager
                      </p>
                    </div>
                  </Link>
                </div>

                <Link
                  to={`/job/${elem._id}`}
                  onClick={() => setJobDetail(elem._id)}
                >
                  <img
                    src={
                      elem.photo ||
                      "https://images.pexels.com/photos/14983436/pexels-photo-14983436/free-photo-of-church-roof-with-a-cross-on-top.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt={elem.title}
                    className="h-64 w-full object-cover"
                  />
                </Link>

                <div className="space-y-3 px-6 py-5">
                  <Link
                    to={`/job/${elem._id}`}
                    onClick={() => setJobDetail(elem._id)}
                    className="font-display text-2xl font-semibold text-ink"
                  >
                    {elem.title}
                  </Link>
                  <div className="text-sm text-ink-soft">
                    <p className="font-semibold text-ink">Location</p>
                    <p>{elem.jobAddress}</p>
                  </div>
                  <div className="text-sm text-ink-soft">
                    <p className="font-semibold text-ink">Description</p>
                    <p className="text-ink-softer">
                      {elem.description?.slice(0, 140)}
                      {elem.description && elem.description.length > 140
                        ? "..."
                        : ""}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && jobsToRender.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
            <p className="font-display text-xl text-ink">
              No roles match your search
            </p>
            <p className="mt-2 text-sm text-ink-softer">
              Try removing filters or create a new listing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobRender;
