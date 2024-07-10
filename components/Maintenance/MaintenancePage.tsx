import React from "react";
import NavLogo from "../Nav/NavLogo";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col space-y-2 p-16 w-full h-full align-center justify-center bg-primary-black">
      <div className="justify-self-center m-auto">
        <NavLogo width={64} height={64} />
      </div>
      <h1 className="flex flex-col text-4xl max-sm:text-2xl font-bold text-primary-red text-center">
        Sorry!{" "}
        <span className="text-primary-white">
          We are currently under maintenance...
        </span>
      </h1>
    </div>
  );
}
