import React from "react";
import Image from "next/image";
import Logo from "../../public/rucshub-logo.png";

export default function NavLogo() {
  return <Image src={Logo} width={35} height={15} alt="RUCS Hub Logo" />;
}
