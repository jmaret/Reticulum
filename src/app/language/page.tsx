import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "The language" };

export default function LanguagePage() {
  return (
    <article className="site-wrap space-y-6 py-8 sm:py-12">
      <header className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">The language</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight">
          A language for data you can write down as a formula.
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--ink-muted)]">
          R is a language for tables, summaries, and pictures of those tables, from a short script
          to a paper that cites a model. The lessons teach the syntax. This page is the reason the
          syntax looks the way it does.
        </p>
      </header>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Origins</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            R descends from S, a language John Chambers and his colleagues began at Bell Labs in the
            1970s for interactive data analysis. S treated a data frame and a formula as ordinary
            values. R kept that shape and made the implementation free.
          </p>
          <p>
            Ross Ihaka and Robert Gentleman started R at the University of Auckland in the early
            1990s. They announced it in 1993. The name is their shared initial. R 1.0.0 was released
            on 29 February 2000. CRAN, the archive of packages, was already running by then.
          </p>
          <p>
            The programs in Reticulum use base R, including the stats package that ships with it.
            Try it runs them with WebR in your browser. A package you would install with
            install.packages is outside these lessons.
          </p>
          <p>
            The R Foundation for Statistical Computing holds the copyright in the R sources. The R
            Core Team maintains the language. A vector is the basic value, which is why a single
            number in these lessons is still a vector of length one, and why print shows an index.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Beside other languages</h2>
        <p className="mt-3 max-w-2xl">
          R shares the page with languages you may already use for data. It spends its strictness
          on vectors, missing values, and formulas.
        </p>
        <div className="doc mt-4 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>R</th>
                <th>Python</th>
                <th>Julia</th>
                <th>SQL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Unit of data</td>
                <td>An atomic vector, then a data frame of columns.</td>
                <td>An object. Arrays arrive through a library.</td>
                <td>An array, with multiple dispatch on its type.</td>
                <td>A table. The query describes the result.</td>
              </tr>
              <tr>
                <td>Missing values</td>
                <td>NA is part of the vector. It spreads unless you remove it.</td>
                <td>None is the absence of an object. NaN is a float.</td>
                <td>missing and nothing are distinct from NaN.</td>
                <td>NULL is unknown. It fails ordinary comparisons.</td>
              </tr>
              <tr>
                <td>A model</td>
                <td>A formula such as y ~ x, passed to a function.</td>
                <td>A method call on an estimator object.</td>
                <td>A function, often with a macro for the formula.</td>
                <td>An aggregate query, not a fitted line.</td>
              </tr>
              <tr>
                <td>When it checks</td>
                <td>Mostly when the line runs.</td>
                <td>Mostly when the line runs. Annotations are optional.</td>
                <td>Types can be checked before the program runs.</td>
                <td>The engine checks names and types when it plans the query.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="doc mt-4 max-w-2xl">
          <p>
            Python is the language beside R in most data work. A data frame in pandas is a cousin of
            a data frame here, and a notebook can hold either. R keeps the formula and the factor in
            the language itself. Python usually reaches for a library.
          </p>
          <p>
            Julia aims at the same numerical work with a type system that can be checked earlier.
            SQL describes a table transformation and does not fit a line unless you leave the query.
            R is the shorter path when the next step is a summary, a test, or a plot of a column.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Why someone chooses it</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>People choose R when the data is already a table and the question is a summary.</p>
          <ul>
            <li>A column is a vector, so the same function that averages two numbers averages a column.</li>
            <li>A formula names the relationship once, and many modeling functions accept that same shape.</li>
            <li>NA is visible. A mean that quietly skipped missing values would be a different function.</li>
            <li>CRAN is where published statistical methods tend to appear first, as an R package.</li>
          </ul>
          <p>
            The tidyverse is a widely used dialect: pipes, tibbles, and a grammar of graphics. These
            lessons stay in base R so the page does not depend on packages WebR would have to
            download. You can read a tidyverse script after this room. It is still R.
          </p>
          <p>
            R is a poor fit when the program is a long-running service, a user interface with no
            data, or a system that must not copy large vectors. Those programs are usually happier
            in a language built for that job.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Where it has a following</h2>
        <div className="doc mt-3 max-w-2xl">
          <ul>
            <li>Statistics departments and methods papers. New estimators often ship as R packages.</li>
            <li>Biostatistics and public health, including work around surveys and clinical data.</li>
            <li>Ecology, genomics, and other fields with a column for every measurement.</li>
            <li>Some finance and official statistics offices, where a reproducible script is the record.</li>
          </ul>
          <p>
            The pattern is the same in each of these: R is the language people write for the
            analysis, and faster numerical code sits underneath when a package needs it.
          </p>
          <p>
            <Link href="/">The lessons</Link> start at the top of a file.{" "}
            <Link href="/further">Further</Link> continues with methods and tables.{" "}
            <Link href="/practice">Practice</Link> covers packages, plots, and summaries.
          </p>
        </div>
      </section>
    </article>
  );
}
