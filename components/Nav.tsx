import { AiOutlineUser } from "react-icons/ai";
import { FaUserAltSlash } from "react-icons/fa";
import React from "react";

interface Props {
  onClick: () => void;
  text: string;
  signed: boolean;
}
const Nav: React.FC<Props> = ({ onClick, text, signed }) => {
  return (
    <div className="flex justify-between px-0 lg:px-2">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
        {signed ? (
          <AiOutlineUser fill="green" size={32} />
        ) : (
          <FaUserAltSlash size={32} />
        )}
      </div>
      <div
        className="px-4 py-2 cursor-pointer rounded-lg bg-green-600 hover:bg-green-700 text-white"
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default Nav;
