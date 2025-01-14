"use client";

import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const GoBack: FunctionComponent = () => {
  const router = useRouter();

  return (
    <Button variant="link" onClick={() => router.back()}>
      <ChevronLeft />
      <span>Go back</span>
    </Button>
  );
};
