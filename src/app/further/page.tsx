import type { Metadata } from "next";
import Link from "next/link";
import { furtherLessons } from "../../../content/further";
import { chapterId, lessonsByChapter } from "../../../content/lessons";
import { LessonView } from "@/components/LessonView";

export const metadata: Metadata = {
  title: "Further",
  description:
    "Further R: S3 methods, packages, functions over lists, factors, data frames, and missing values.",
};

export default function FurtherPage() {
  const chapters = lessonsByChapter(furtherLessons);

  return (
    <div className="site-wrap space-y-8 py-8 sm:py-12">
      <section className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Further</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From a method chosen by its class to a missing value in a column.
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--ink-muted)] sm:text-lg">
          Eleven programs past the first page: S3 methods, packages, functions over lists, factors,
          data frames, and NA. Each one still has a check you answer here.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#s3" className="btn-accent">
            Start with a method
          </a>
          <Link href="/#script" className="btn-ghost">
            Back to the top
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

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Practice</h2>
        <p className="mt-2 max-w-xl text-[var(--ink-muted)]">
          Packages that ship with R, plots, and a few summaries each have their own program on the
          next page.
        </p>
        <Link href="/practice" className="btn-accent mt-6">
          Continue
        </Link>
      </section>
    </div>
  );
}
