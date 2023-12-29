import { FC, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Theme } from "@/store/theme";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
  description: string;
  rating: string;
  genre: string;
}

export const Card: FC<CardProps> = ({
  id,
  title,
  year,
  medium_cover_image,
  description,
  rating,
  genre,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const { currentTheme } = useContext(Theme);
  const toggleMouseOver = () => setMouseOver((prev) => !prev);

  const router = useRouter();

  const onFilmClick = () => {
    router.push(`/movie/${id}`);
  };

  if (!description) {
    return null;
  }

  return (
    <div
      onMouseOver={toggleMouseOver}
      onMouseOut={toggleMouseOver}
      className=" hover:scale-105 mt-2 rounded-lg px-2 mb-2"
      onClick={onFilmClick}
      style={{ maxWidth: "180px" }}>
      <div className="relative rounded-lg">
        <Image
          width={203}
          height={300}
          loading="lazy"
          className="rounded-lg"
          src={medium_cover_image}
          alt={title}
        />
        <div
          className="flex flex-col h-full  w-full absolute top-0 left-0 opacity-0 hover:opacity-100 rounded-lg px-4 py-2 justify-center cursor-pointer "
          style={{ backgroundColor: "rgba(7,5,14,.8)" }}>
          <span className="font-extrabold text-2xl text-white mb-3">
            {rating}
          </span>
          <span className=" text-base text-white">
            {title}, {year}
          </span>
          <span className="text-white font-extralight">{genre}</span>
        </div>
      </div>
      <p className="truncate mt-3">{title}</p>
    </div>
  );
};
