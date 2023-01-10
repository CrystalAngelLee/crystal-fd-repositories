import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      onClick={() => {
        console.log(123);
      }}
    >
      Home
      <Link to='/list'>jump to list</Link>
    </div>
  );
}
