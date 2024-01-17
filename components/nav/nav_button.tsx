"use client";

import React from "react";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link: string;
  text: string;
}

export default function NavButton({ link, text }: NavButtonProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(link);
  const buttonClass = isActive
    ? "bg-primary-white text-primary-black"
    : "bg-transparent text-primary-white hover:bg-primary-red/50 hover:text-primary-white transition duration-150 ease-out hover:ease-in";

  return (
    <Button asChild variant="outline" className={buttonClass}>
      <Link href={link}>{text}</Link>
    </Button>
  );
}
