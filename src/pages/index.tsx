import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { useDebounce } from "../hooks/useDebounce";
import { genres, sortTypes } from "../../constants";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date_added");
  const [genre, setGenre] = useState("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);
  const { currentTheme } = useContext(Theme);

  useEffect(() => {
    const fetch = async () => {
      const response = await getFilms(String(1), genre, debouncedQuery, sortBy);
      setFilms(response.movies);
    };
    fetch();
  }, [genre, debouncedQuery, sortBy]);

  const fetchMoreData = async () => {
    setCurrentPage((prev) => prev + 1);
    const response = await getFilms(
      String(currentPage),
      genre,
      debouncedQuery,
      sortBy
    );
    if (response?.movies) {
      setFilms((prev) => [...prev, ...response.movies]);
    }
  };

  return (
    <div
      className={`pt-20`}
      style={{
        backgroundColor: `${
          currentTheme == "black" ? "cadetblue" : "darkgrey"
        }`,
      }}>
      <Header arrowBack={false} />

      <main className="min-h-screen flex justify-center px-10">
        <section className="flex flex-col items-center container py-20">
          <div className="flex items-center-center w-full mb-10 flex-col">
            <div className="flex items-center max-lg:flex-col ">
              <h1
                className={`text-5xl  justify-center ${
                  currentTheme == "black" ? "text-white" : "text-black"
                } max-md:mb-5 font-extrabold`}>
                FILMS
              </h1>
              <div className="flex items-center max-md:flex-col">
                <div className="relative max-lg:mb-4 max-md:mb-4 ">
                  <span
                    className={`absolute -top-4 left-7 ${
                      currentTheme == "black" ? "bg-trasparent text-white" : ""
                    }`}>
                    query
                  </span>
                  <input
                    placeholder="type film"
                    className="border px-5 py-2 border-black mx-5 w-60 rounded-md "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="relative max-md:mb-4 ">
                  <span
                    className={`absolute -top-4 left-7 ${
                      currentTheme == "black"
                        ? "bg-trasparent text-white -top-5"
                        : ""
                    }`}>
                    genre
                  </span>

                  <select
                    className="border px-5 py-2 border-black mx-5 w-60 rounded-md"
                    onChange={(e) => setGenre(e.target.value)}>
                    {genres.map((genre, index) => (
                      <option key={index}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div className="relative max-md:mb-4">
                  <span
                    className={`absolute -top-4 left-7 ${
                      currentTheme == "black"
                        ? "bg-trasparent text-white -top-5"
                        : ""
                    }`}>
                    sort
                  </span>
                  <select
                    className="border px-5 py-2 border-black mx-5 w-60 rounded-md"
                    onChange={(e) => {
                      let selectedIndex = e.target.selectedIndex;
                      let value = e.target.options[selectedIndex].value;
                      setSortBy(value);
                    }}>
                    {sortTypes.map((type, index) => (
                      <option
                        key={index}
                        value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-20 justify-center w-full flex-wrap">
            {films?.length > 0 ? (
              films?.map((item: MovieList, index) => (
                <Card
                  key={index}
                  id={item?.id}
                  rating={String(item?.rating)}
                  genre={genre !== "all" ? genre : genres[0]}
                  description={item.description_full || item.summary}
                  title={item?.title}
                  year={item?.year}
                  medium_cover_image={item.medium_cover_image}
                />
              ))
            ) : (
              <div className="flex justify-center items-center min-w-full min-h-screen">
                <Hourglass
                  height="100"
                  width="100"
                  radius="9"
                  color="#4d50bf"
                  ariaLabel="loading"
                />
              </div>
            )}
          </div>

          <button
            className={`
              w-full text-xl py-3 rounded-lg mt-auto cursor-pointer 
              ${
                currentTheme == "black"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            onClick={fetchMoreData}>
            Show more
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
