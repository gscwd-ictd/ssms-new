"use client";

import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const GoBack: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const removeAfterFirstSlash = (str: string) => {
    // Find the last occurrence of "/"
    const lastSlashIndex = str.lastIndexOf("/");

    // If no slash is found, return the original string
    if (lastSlashIndex === -1) {
      return str;
    }

    // If the last slash is at the beginning (index 0), return "/"
    if (lastSlashIndex === 0) {
      return "/";
    }

    // Otherwise return everything up to the last "/"
    return str.substring(0, lastSlashIndex);
  };

  return (
    <Button variant="link" onClick={() => router.push(removeAfterFirstSlash(pathname))}>
      <ChevronLeft />
      <span>Go back</span>
    </Button>
  );
};
