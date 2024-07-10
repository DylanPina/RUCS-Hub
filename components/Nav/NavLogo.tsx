import React from "react";
import Image from "next/image";
import Logo from "../../public/rucshub-logo.png";

interface Props {
  width?: number;
  height?: number;
}

export default function NavLogo({ width, height }: Props) {
  return (
    <Image
      src={Logo}
      width={width ?? 36}
      height={height ?? 32}
      alt="RUCS Hub Logo"
    />
  );
}
