import type { Metadata } from "next";
import { Playground } from "@/components/Playground";

export const metadata: Metadata = {
  title: "Try it",
  description: "Run a lesson program with R in the browser.",
};

export default function PlayPage() {
  return <Playground />;
}
