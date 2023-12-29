import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { Theme } from "@/store/theme";
import moon from "../../../public/static/moon.svg";
import Image from "next/image";
import arrow from "../../../public/static/arrow.png";

interface HeaderProps {
  arrowBack: boolean;
}

export const Header: FC<HeaderProps> = ({ arrowBack }) => {
  const router = useRouter();

  const { currentTheme, toggleTheme } = useContext(Theme);

  const onBackClick = () => {
    router.push("/");
  };
  return (
    <header
      className={`flex px-20 py-3  w-full py-1 border-b-2 justify-between items-center fixed top-0 left- max-md:px-4`}
      style={{
        zIndex: 6,
        backgroundColor: `${currentTheme == "black" ? "white" : "black"}`,
        color: `${currentTheme == "black" ? "black" : "white"}`,
      }}>
      <h1 className="text-xl flex   leading-loose ">IVI MOVIES</h1>
      <div className="flex items-center">
        {arrowBack && (
          <button
            onClick={onBackClick}
            className="text-base border py-2 px-4 rounded-lg cursor-pointer">
            {"go to main page"}
          </button>
        )}
        <Image
          width={40}
          height={40}
          src={moon}
          className={`cursor-pointer ml-4 ${
            currentTheme == "black" ? "invert" : ""
          }`}
          alt="theme switch p-2"
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
};
