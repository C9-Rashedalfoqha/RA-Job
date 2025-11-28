import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";

const User = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [UserDetails, setUserDetails] = useState([]);

  const { id } = useParams();
  const { token } = useContext(userContext);

  useEffect(() => {
    axios
      .get(`${process.env.URL_SERVER}/job/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUserPosts(result.data.job);
        setUserDetails(result.data.job[0].userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[360px,1fr]">
        <div className="rounded-3xl bg-white shadow-soft ring-1 ring-slate-100">
          <img
            src={
              UserDetails.photo ||
              "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
            }
            alt={`${UserDetails.FirstName || "User"} avatar`}
            className="h-64 w-full rounded-t-3xl object-cover"
          />
          <div className="space-y-2 px-6 py-6">
            <h5 className="font-display text-2xl font-semibold text-ink">
              {UserDetails.FirstName} {UserDetails.lastName}
            </h5>
            <p className="text-sm text-ink-soft">{UserDetails.Email}</p>
            <p className="text-sm text-ink-soft">{UserDetails.phoneNumber}</p>
          </div>
        </div>

        <div className="space-y-6">
          {userPosts.map((post) => (
            <article
              key={post._id}
              className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
            >
              {post.photo && (
                <img
                  src={post.photo}
                  alt={post.title}
                  className="h-64 w-full object-cover"
                />
              )}
              <div className="space-y-3 px-6 py-5">
                <h5 className="font-display text-2xl font-semibold text-ink">
                  {post.title}
                </h5>
                <p className="text-sm text-ink-soft">
                  Job Address: {post.jobAddress}
                </p>
                <p className="text-sm text-ink-soft">
                  Description: {post.description}
                </p>
                <p className="text-sm text-ink-soft">Salary: {post.salary}</p>
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
    </section>
  );
};

export default User;
