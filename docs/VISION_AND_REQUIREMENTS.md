# Vision and requirements

**Product:** Reticulum

**Last updated:** 2026-10-16

## Summary

Reticulum is a public room that teaches R. A visitor can read where the language came from, how it sits beside Python, Julia, and SQL, and why people reach for it. The first page is a short path: the shape of a tiny program, the syntax that writes it, and copy-on-modify, environments, `NA`, `NULL`, and errors. `/further` continues on its own page with S3 methods, functions over lists, factors, data frames, formulas, and missing values in a vector. `/practice` is a third page: packages that ship with R, base graphics, and a few statistical summaries.

Checks are graded in the browser. A program runs only when the visitor chooses Try it, and then in this browser with WebR. This site does not keep an account. The public WebR editor does not document a link that carries a program, so Try it opens `/play` on this site.

The name of the product is Reticulum.

## Vision

Reticulum teaches R by a short path, then two later pages. The first lessons are the shape of a program: a file that runs from the top, `sprintf`, and a project directory. The next lessons are the syntax that fills that shape. The last lessons on that page are the ideas that make R R: changing a vector copies, an environment is shared, and absence is `NA` or `NULL` while failure is an error. `/further` is the later path: S3 methods through missing values in a column, so the first page does not keep growing. `/practice` is the working path: `library`, `::`, plots, and summaries such as the mean, the standard deviation, a correlation, and a paired test.

The room is free to open. Nothing the visitor answers is stored. The interpreter is WebR, downloaded when the visitor opens Try it, and the program runs on the visitor's machine.

## Users

- **Visitor** — reads where the language came from, then a lesson on the first page, on `/further`, or on `/practice`, answers its checks, and may run the same program with WebR.
- **Builder** — ships the static site and keeps the lessons and these documents together.

## Principles

- **Zero cost** — static export, no account, no paid API, no R server.
- **A real program** — each lesson shows one short program. Try it runs that program.
- **A check you can finish here** — the answer is graded in the browser, with the explanation either way.
- **One visual system** — AetherForge chrome: paper `#F6EAD8`, ink `#152028`, petrol `#0F4C5C`, Source Serif 4, Source Sans 3, IBM Plex Mono, frosted panels. The mark is a net of stars. The backdrop is stars, math, and statistics.
- **Living documents** — the vision page and the architecture page render the Summary of these files. A change to the app updates the files in the same work.
- **The name is Reticulum** — pages, the header, and these documents use that word alone.

## In scope

- `/language` explains the origins of R, how it compares with Python, Julia, and SQL, why someone chooses it, and where it has a following.
- Thirteen lessons on `/`: a script with no `main`, `sprintf`, the project shape, `<-`, atomic types, functions and the last value, `if` and `for`, lists and `$`, `switch`, vectors and recycling, copy-on-modify, environments, and `NA`, `NULL`, and `tryCatch`.
- Eleven lessons on `/further`: an S3 method, one generic for two classes, a nested function, `::`, `lapply`, a function that returns a function, a mixed list, a factor, a data frame, a formula with `lm`, and `NA` inside `mean`.
- Twelve lessons on `/practice`: `library`, the search path, `::` without attaching, a scatter, a histogram, a boxplot, a fitted line, the mean and median, the standard deviation, `table`, correlation, and a paired `t.test`.
- One or two checks on each lesson, graded in the browser.
- Try it opens `/play` with that lesson's program. `/play` loads WebR 0.5.5, runs the snippet in the browser, and shows a plot when the program draws one.
- `/vision` renders the Summary of this document.
- `/architecture` draws the conceptual, logical, and physical views, then renders the architecture Summary.
- `/releases` renders `CHANGELOG.md`. The header version chip links there and shows the package version.
- A field of stars, math, and statistics behind the pages, with the AetherForge paper wash so the type stays readable.
- A static export on GitHub Pages at https://reticulum.aathira-services.com/. Styles, the drawing, and the icon load from the site root. https://jmaret.github.io/Reticulum/ redirects there.

## Out of scope

- Hosting an R process on a server.
- Accounts, saved answers, or progress that survives a refresh.
- The tidyverse and any package that must be downloaded. The language page names the tidyverse as a dialect. Base graphics and the packages that ship with R, including `datasets` and `stats`, are in scope on `/practice`.
- An AetherForge catalog entry, until that is asked for.

## Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| V-1 | Lessons run from the top of a script through copy-on-modify, environments, `NA`, `NULL`, and errors | Met |
| V-2 | Each lesson has one program and one or two checks graded in the browser | Met |
| V-3 | Try it runs that program in the browser with WebR. This site does not host an R server | Met |
| V-4 | `/vision` renders the Summary of this document | Met |
| V-5 | `/architecture` shows conceptual, logical, and physical pictures, then the architecture Summary | Met |
| V-6 | `/releases` renders the changelog. The header chip links to it and shows the package version | Met |
| V-7 | The chrome matches AetherForge, with the star-net mark and the stars, math, and statistics backdrop | Met |
| V-8 | The site is a static export with no auth and no paid dependency | Met |
| V-9 | A code change updates this document, the architecture document, and `CHANGELOG.md` together | Met |
| V-10 | The product name is Reticulum alone | Met |
| V-11 | `/language` covers origins, comparisons with Python, Julia, and SQL, why someone chooses R, and where it has a following | Met |
| V-12 | `/further` teaches S3 methods through missing values, on a page of its own, with the same checks and Try it | Met |
| V-13 | The public site is https://reticulum.aathira-services.com/. Styles, the drawing, and the icon load from `/` | Met |
| V-14 | `/practice` teaches `library`, base graphics, and statistical summaries. Try it shows stdout and stderr, and a plot when the program draws one | Met |

## Acceptance

A visitor can read the language page, open a lesson on the first page, on `/further`, or on `/practice`, answer a check, see whether it was right, and open Try it so the program runs in the browser. The result is the program's printed text, and a program that plots shows the figure on `/play`. The visitor can read the vision summary, the three architecture pictures, and the release notes from the version chip. The page does not ask for a sign-in, and a check does not leave the browser.

## Changelog

- 2026-10-16 — First room: thirteen lessons, eleven further lessons, checks, Try it with WebR, the language page, vision, architecture drawings, and release notes. The backdrop is stars, math, and statistics.
- 2026-10-16 — Practice page: twelve lessons on `library`, base graphics, and summaries. Try it shows the plot beside the printed result.
- 2026-10-16 — The public site is GitHub Pages at https://jmaret.github.io/Reticulum/, with assets prefixed by `/Reticulum`.
- 2026-10-16 — Try it shows stdout and stderr. The icon loads under the same prefix.
- 2026-10-16 — The public site is https://reticulum.aathira-services.com/. Assets load from the site root.
