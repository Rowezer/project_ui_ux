"use client";
import { getFilmById } from "@/api";
import { FC, useContext, useEffect, useState } from "react";
import { MovieList } from "@/api";
import { useParams } from "next/navigation";
import { Hourglass } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { useRouter } from "next/router";
import { Footer } from "@/components/Footer";
import { useComments } from "../../hooks/useComments";
import Image from "next/image";

import yts from "../../../public/static/YTS.png";

const Details: FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieList>();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });
  const id = useParams()?.id;
  const { comments, updateComments, deleteComment } = useComments(id);
  const { currentTheme } = useContext(Theme);
  const router = useRouter();

  const onCommentChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const response: MovieList = await getFilmById(id);
        setMovieDetails(response);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      <div
        className={`pt-20`}
        style={{
          backgroundColor: `${
            currentTheme == "black" ? "cadetblue" : "darkgrey"
          }`,
          color: `${currentTheme == "black" ? "white" : "black"}`,
        }}>
        <Header arrowBack={true} />
        {!loading ? (
          <section className="min-h-screen flex items-center flex-col">
            <div className="flex container py-20 px-3 relative max-lg:flex-col">
              <div
                className=" sticky top-0 max-lg:relative  w-full mr-10 w-full grow max-lg:mb-6"
                style={{
                  minWidth: "60%",
                  aspectRatio: "16/9",
                  maxHeight: "400px",
                }}>
                <Image
                  src={movieDetails?.background_image}
                  layout="fill"
                  alt={movieDetails?.title}
                  className="mr-10 mb-7 rounded-md"
                />
              </div>
              <div className="text">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-5xl">{movieDetails?.title}</h1>
                </div>

                <p className="mb-5">{movieDetails?.description_full}</p>

                <button
                  className="text-xl border-2 px-4 py-2 rounded-lg hover:bg-sky-500 hover:text-white mb-5"
                  onClick={() => router.push(movieDetails?.url)}>
                  Watch now
                </button>

                <div className="about flex flex-col ">
                  <p className="text-2xl font-bold mb-3"> About film</p>
                  <div className="flex-wrap flex">
                    <div className="flex justify-start items-center mt-2 mr-2">
                      <span className="text-xl mr-3 font-extralight  basis-60 ">
                        Year
                      </span>
                      <span className="">{movieDetails?.year}</span>
                    </div>
                    <div className="flex items-center mt-2 mr-4  p-1">
                      <span className="text-xl mr-3  font-extralight basis-60">
                        Like count
                      </span>
                      <span className="">{movieDetails?.like_count}</span>
                    </div>
                    <div className="flex items-center mt-2  mr-4 p-1">
                      <span className="text-xl mr-3 font-extralight  basis-60 ">
                        Runtime
                      </span>
                      <span className="">{movieDetails?.runtime}</span>
                    </div>
                    <div className="flex items-center mt-2 mr-4 p-1">
                      <span className="text-xl mr-3 font-extralight  basis-60">
                        Language
                      </span>
                      <span className="">{movieDetails?.language}</span>
                    </div>
                    <div className="flex items-center mt-2  mr-4  p-1">
                      <span className="text-xl mr-3 font-extralight  basis-60">
                        Rating
                      </span>
                      <span className="">{movieDetails?.rating}</span>
                    </div>
                    <div className="flex items-center mt-2 mr-4  p-1">
                      <span className="text-xl mr-3 font-extralight">
                        Genre
                      </span>
                      <span className="flex flex-wrap w-full">
                        {movieDetails?.genres.map((genre) => `${genre} `)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container flex flex-col mt-32 pb-10 px-5">
              <p className="text-3xl   mb-5">Comments</p>
              <p className="  mb-2">Name</p>
              <input
                name="name"
                onChange={onCommentChange}
                value={comment.name}
                type="text"
                className="`w-80 bg-white border-2 p-2 mb-2 rounded-md text-black"
              />
              <p className=" mb-2">Comment</p>
              <textarea
                value={comment.text}
                onChange={onCommentChange}
                name="text"
                className="w-full bg-white border-2 p-2 rounded-md text-black"
              />
              <button
                onClick={() => {
                  updateComments(id, comment);
                  setComment({ name: "", text: "" });
                }}
                className="ml-auto border-2 rounded-md p-3 mt-3 bg-black hover:bg-white text-gray-300 hover:text-black mb-4          
              ">
                Send
              </button>
              <div className="flex flex-wrap justify-center">
                {comments.length > 0 ? (
                  comments?.map((comment, index) => (
                    <div
                      key={index}
                      style={{ minHeight: "400px", maxWidth: "500px" }}
                      className="flex flex-col border bg-white w-full p-5 text-white rounded-md  mx-2 mb-4">
                      <p className="text-xl extrabold mb-2 text-black">
                        {comment.name}
                      </p>
                      <p className="text-gray-500">{comment.text}</p>
                      <button
                        onClick={() => deleteComment(comment)}
                        className="ml-auto font-extrabold text-black mt-auto">
                        DELETE
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-3xl">Be the first to comment</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <div className="flex justify-center items-center min-w-full min-h-screen">
            <Hourglass
              height="80"
              width="80"
              radius="9"
              color="gray"
              ariaLabel="loading"
            />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Details;
