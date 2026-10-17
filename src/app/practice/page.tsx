import type { Metadata } from "next";
import Link from "next/link";
import { practiceLessons } from "../../../content/practice";
import { chapterId, lessonsByChapter } from "../../../content/lessons";
import { LessonView } from "@/components/LessonView";

export const metadata: Metadata = {
  title: "Practice",
  description: "Practice with library, base graphics, and a few statistical summaries.",
};

export default function PracticePage() {
  const chapters = lessonsByChapter(practiceLessons);

  return (
    <div className="site-wrap space-y-8 py-8 sm:py-12">
      <section className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Practice</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From a package name to a line drawn through the points.
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--ink-muted)] sm:text-lg">
          Twelve programs on packages that ship with R, on plots, and on a few summaries. Each one
          still has a check you answer here. Try it draws a figure when the program plots.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#library" className="btn-accent">
            Start with a package
          </a>
          <Link href="/further" className="btn-ghost">
            Back to further
          </Link>
        </div>
      </section>

      {chapters.map((group) => (
        <section key={group.chapter} id={chapterId(group.chapter)} className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">{group.chapter}</h2>
          {group.lessons.map((lesson) => (
            <LessonView key={lesson.id} lesson={lesson} />
          ))}
        </section>
      ))}
    </div>
  );
}
