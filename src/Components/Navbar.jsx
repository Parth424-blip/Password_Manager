import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 py-4 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">Op/&gt;</span>/
        </div>
        <ul></ul>
        <button className="text-white bg-green-700 my-5 rounded-full flex gap-4 justify-center items-center p-2">
          <img
            className="invert p-1 w-10 "
            src="/Icons/icons8-github.svg"
            alt="sdds"
          />
          <span className="font-bold ring-white ">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
