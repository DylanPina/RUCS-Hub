import React from "react";
import NavLarge from "./nav_large";
import NavSmall from "./nav_small";

export default function Nav() {
  return (
    <div className="sticky top-0 z-100 flex place-items-center w-full">
      <NavLarge />
      <NavSmall />
    </div>
  );
}
