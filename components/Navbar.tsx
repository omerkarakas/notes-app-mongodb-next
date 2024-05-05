import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between items-center bg-slate-400 px-8 py-3 rounded-md">
      <Link className="text-white font-bold" href="/">
        Home
      </Link>
      <Link className="btn btn-info text-white" href="/add-note">
        Add Note
      </Link>
    </nav>
  );
};

export default Navbar;
