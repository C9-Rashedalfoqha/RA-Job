import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

const Post = () => {
  const { token, post, setPost, userId, setUserDetail } =
    useContext(userContext);
  const [comment, setComment] = useState("");
  const [update, setUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [Like, setLike] = useState(false);
 
  const uploadImage = () => {
    if (!image) return;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wq8dmxe2");
    data.append("cloud_name", "duanrnkmq");

    axios
      .post(`https://api.cloudinary.com/v1_1/duanrnkmq/image/upload`, data)
      .then((data) => {
        setUrl(data.data.url);
        console.log("uploaded");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://r-a-jobsearch.onrender.com/post/get", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setPost(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [setPost, token]);

  return (
    <>
      {post ? (
        <section className="space-y-10 px-4 py-8">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100">
            <h2 className="font-display text-2xl font-bold text-ink">
              Share an update
            </h2>
            <p className="mt-1 text-sm text-ink-softer">
              Inspire the community with your learnings, wins, or job tips.
            </p>

            <textarea
              id="newPostDescription"
              className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-base text-ink shadow-sm focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="What's on your mind?"
              required
              onChange={(e) => {
                setNewPostDescription(e.target.value);
              }}
              value={newPostDescription}
              rows={4}
            />

            {url && (
              <img
                src={url}
                className="mt-4 w-full rounded-2xl object-cover"
                alt="Uploaded"
                height="270"
              />
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-ink-softer hover:border-brand/40">
                Upload media
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </label>
              {image && (
                <button
                  className="rounded-2xl border border-brand/30 px-4 py-3 text-sm font-semibold text-brand hover:bg-brand/10"
                  type="button"
                  onClick={uploadImage}
                >
                  Upload
                </button>
              )}
              <button
                className="rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-400"
                onClick={() => {
                  axios
                    .post(
                      "https://r-a-jobsearch.onrender.com/post",
                      {
                        description: newPostDescription,
                        photo: url,
                      },
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((result) => {
                      setPost([...post, result.data.post]);
                      setNewPostDescription("");
                      setImage(null);
                      setUrl("");
                    });
                }}
                type="button"
                disabled={!newPostDescription.trim()}
              >
                Publish post
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-4xl space-y-6">
            {post.map((elem) => (
              <article
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                key={elem._id}
              >
                <div className="flex items-center gap-3">
                  <Link
                    to={`/user/${elem.userId._id}`}
                    onClick={() => {
                      setUserDetail(elem.userId._id);
                    }}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={
                        elem.userId.photo ||
                        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
                      }
                      alt={elem?.userId?.FirstName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-ink">
                        {elem?.userId?.FirstName} {elem?.userId?.lastName}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-ink-softer">
                        Community member
                      </p>
                    </div>
                  </Link>
                </div>

                <p className="mt-4 text-base text-ink">{elem?.description}</p>

                {elem.photo && (
                  <img
                    src={elem?.photo}
                    className="mt-4 w-full rounded-2xl object-cover"
                    alt="Post"
                    height="450"
                  />
                )}

                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <button
                    className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink hover:border-brand/40"
                    onClick={() => {
                      setLike(!Like);
                    }}
                  >
                    {Like ? (
                      <AiFillLike className="text-brand" />
                    ) : (
                      <BiLike className="text-brand" />
                    )}
                    Appreciate
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink hover:border-brand/40"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <FaComment />
                    {showComments ? "Hide" : "Comments"}
                  </button>
                  {elem.userId._id === userId && (
                    <TiDelete
                      className="ml-auto cursor-pointer text-2xl text-red-400 hover:text-red-500"
                      onClick={() => {
                        axios
                          .delete(
                            `https://r-a-jobsearch.onrender.com/post/delete/${elem._id}`,
                            {
                              headers: {
                                authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then(() => {
                            const filteredPost = post.filter((element) => {
                              return elem._id !== element._id;
                            });
                            setPost(filteredPost);
                          })
                          .catch((err) => {
                            console.log(err.message);
                          });
                      }}
                    />
                  )}
                </div>

                {showComments && (
                  <div className="mt-4 space-y-3 rounded-2xl bg-slate-50/60 p-4">
                    {elem.comment.map((comment, i) => (
                      <div
                        className="rounded-2xl bg-white px-4 py-3 text-sm text-ink"
                        key={`${elem._id}-comment-${i}`}
                      >
                        {comment.comment}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <input
                    placeholder="Add a thoughtful comment"
                    type="text"
                    required
                    className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-soft disabled:cursor-not-allowed disabled:bg-slate-400"
                    onClick={() => {
                      axios
                        .post(
                          `https://r-a-jobsearch.onrender.com/post/${elem._id}/comments/`,
                          {
                            comment: comment,
                          },
                          {
                            headers: {
                              authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then(() => {
                          const updatedPosts = post.map((element) =>
                            element._id === elem._id
                              ? {
                                  ...element,
                                  comment: [
                                    ...element.comment,
                                    {
                                      comment: comment,
                                    },
                                  ],
                                }
                              : element
                          );
                          setPost(updatedPosts);
                          setComment("");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    disabled={!comment.trim()}
                  >
                    <IoSend />
                  </button>
                </div>

                {elem.userId._id === userId && (
                  <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                    {update ? (
                      <div className="space-y-3">
                        <input
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          type="text"
                          placeholder="Edit description"
                          required
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex gap-3">
                          <button
                            className="flex-1 rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                            onClick={() => {
                              axios
                                .put(
                                  `https://r-a-jobsearch.onrender.com/post/update/${elem._id}`,
                                  {
                                    description: description,
                                  },
                                  {
                                    headers: {
                                      authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then(() => {
                                  setUpdate(!update);

                                  const updatedPosts = post.map((element) =>
                                    element._id === elem._id
                                      ? {
                                          ...element,
                                          description: description,
                                        }
                                      : element
                                  );
                                  setPost(updatedPosts);
                                  setDescription("");
                                })
                                .catch((err) => {
                                  console.log(err.message);
                                });
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-ink hover:border-brand/40"
                            onClick={() => setUpdate(!update)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-ink hover:border-brand/40"
                        onClick={() => {
                          setUpdate(!update);
                        }}
                      >
                        Update description
                      </button>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
            <p className="mt-4 text-sm font-semibold text-ink-softer">
              Loading posts...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
