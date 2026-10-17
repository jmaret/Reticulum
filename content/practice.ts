import { r, type Lesson } from "./lessons";

export const practiceLessons: Lesson[] = [
  {
    id: "library",
    chapter: "A library",
    title: "library attaches a package",
    summary:
      "library puts a package on the search path. datasets ships with R, and mtcars is one of its tables. After library(datasets), the name mtcars can be used on its own.",
    code: r(`
      library(datasets)
      print(nrow(mtcars))
    `),
    notice:
      "nrow counts the rows. mtcars is a data frame of cars from Motor Trend, 1974. This page only uses packages that ship with R. It does not call install.packages.",
    checks: [
      {
        id: "library-rows",
        prompt: "How many rows does mtcars have?",
        options: [
          { id: "a", label: "32" },
          { id: "b", label: "11" },
          { id: "c", label: "1, one row per package" },
        ],
        answer: "a",
        explanation: "mtcars has 32 cars, one per row. library(datasets) makes that table available by name.",
      },
      {
        id: "library-does",
        prompt: "What does library(datasets) do?",
        options: [
          { id: "a", label: "It attaches datasets so its names can be used without a prefix" },
          { id: "b", label: "It downloads datasets from the internet" },
          { id: "c", label: "It draws a plot of every table in the package" },
        ],
        answer: "a",
        explanation: "datasets is already installed with R. library attaches it. The names inside it, including mtcars, are then found by a bare word.",
      },
    ],
  },
  {
    id: "search-path",
    chapter: "A library",
    title: "The package appears on the search path",
    summary:
      "search lists the places R looks for a name, in order. After library(datasets), one of those places is package:datasets.",
    code: r(`
      library(datasets)
      print("package:datasets" %in% search())
    `),
    notice: "%in% asks whether the string is one of the entries. TRUE means the package is attached.",
    checks: [
      {
        id: "search-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "TRUE" },
          { id: "b", label: "FALSE" },
          { id: "c", label: "package:datasets" },
        ],
        answer: "a",
        explanation: "library added package:datasets to the search path, so the membership test is TRUE.",
      },
    ],
  },
  {
    id: "colon-call",
    chapter: "A library",
    title: ":: reaches a package without attaching it",
    summary:
      "datasets::mtcars reads mtcars from that package even when you have not called library. The package name stays in the source, next to the object.",
    code: r(`
      print(nrow(datasets::mtcars))
    `),
    notice:
      "Use library when you will use many names from one package. Use :: when you want one name and a visible package. Both find mtcars. Neither installs it.",
    checks: [
      {
        id: "colon-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "32" },
          { id: "b", label: "0, because library was not called" },
          { id: "c", label: "The call fails, because the package is not attached" },
        ],
        answer: "a",
        explanation: ":: looks inside datasets directly. Attaching the package is not required for that one lookup.",
      },
    ],
  },
  {
    id: "scatter",
    chapter: "Graphs",
    title: "plot draws a point for each pair",
    summary:
      "plot(span, knots) uses the first vector as the horizontal axis and the second as the vertical axis. Each position in the two vectors becomes one point.",
    code: r(`
      span <- c(2, 4, 6)
      knots <- c(3, 5, 7)
      plot(span, knots)
    `),
    notice:
      "Try it draws the figure in this browser. The three points rise together: when span increases by 2, knots increases by 2.",
    checks: [
      {
        id: "scatter-count",
        prompt: "How many points does this plot draw?",
        options: [
          { id: "a", label: "3, one for each pair" },
          { id: "b", label: "1, the mean of the two vectors" },
          { id: "c", label: "6, one for each number" },
        ],
        answer: "a",
        explanation: "plot pairs the values by position. There are three positions, so there are three points.",
      },
      {
        id: "scatter-axes",
        prompt: "Which vector is the horizontal axis?",
        options: [
          { id: "a", label: "span, the first argument" },
          { id: "b", label: "knots, the second argument" },
          { id: "c", label: "Neither. plot always uses the row number." },
        ],
        answer: "a",
        explanation: "The first argument of plot is x. span runs along the horizontal axis. knots is y.",
      },
    ],
  },
  {
    id: "histogram",
    chapter: "Graphs",
    title: "hist counts values into bins",
    summary:
      "hist groups numbers into bins and draws a bar for each count. The breaks here are 0, 4, and 8, so the bins are (0, 4] and (4, 8].",
    code: r(`
      spans <- c(2, 2, 3, 5, 5, 5, 8)
      counts <- hist(spans, breaks = c(0, 4, 8), plot = FALSE)$counts
      hist(spans, breaks = c(0, 4, 8))
      print(counts)
    `),
    notice:
      "plot = FALSE computes the counts without drawing. The second hist draws the same bins. 2, 2, and 3 fall in the first bin. 5, 5, 5, and 8 fall in the second.",
    checks: [
      {
        id: "hist-output",
        prompt: "What two counts are printed?",
        options: [
          { id: "a", label: "3 4" },
          { id: "b", label: "2 5" },
          { id: "c", label: "7 2" },
        ],
        answer: "a",
        explanation: "Three values are at most 4. Four values are greater than 4 and at most 8.",
      },
    ],
  },
  {
    id: "boxplot",
    chapter: "Graphs",
    title: "A box marks the median",
    summary:
      "boxplot draws a box from the lower quartile to the upper quartile. The line across the box is the median. The print shows that median as a number.",
    code: r(`
      spans <- c(2, 4, 4, 6, 9)
      boxplot(spans)
      print(median(spans))
    `),
    notice: "Sorted, the values are 2, 4, 4, 6, 9. The middle one is 4, and that is the line in the box.",
    checks: [
      {
        id: "box-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "4" },
          { id: "b", label: "9" },
          { id: "c", label: "5" },
        ],
        answer: "a",
        explanation: "The median of five sorted values is the third, which is 4. The boxplot's center line is that same median.",
      },
    ],
  },
  {
    id: "line",
    chapter: "Graphs",
    title: "abline adds the fitted line",
    summary:
      "plot opens the figure. abline(lm(knots ~ span)) draws the straight line from that fit on top of the points. These three points sit on the line knots = span + 1.",
    code: r(`
      span <- c(2, 4, 6)
      knots <- c(3, 5, 7)
      plot(span, knots)
      abline(lm(knots ~ span))
    `),
    notice: "abline needs a plot that is already open. The formula is the same shape as the model lesson: knots depends on span.",
    checks: [
      {
        id: "line-through",
        prompt: "Where does the line sit relative to the points?",
        options: [
          { id: "a", label: "Through all three, because they are colinear" },
          { id: "b", label: "Through none of them. abline draws a horizontal axis." },
          { id: "c", label: "Through the first point only" },
        ],
        answer: "a",
        explanation: "Each knot is the span plus 1. A straight line with slope 1 and intercept 1 passes through every point.",
      },
    ],
  },
  {
    id: "center",
    chapter: "Summaries",
    title: "Mean and median answer different questions",
    summary:
      "mean is the arithmetic average. median is the middle value after sorting. A large value pulls the mean and leaves the median where the middle is.",
    code: r(`
      spans <- c(2, 4, 4, 6, 9)
      print(c(mean(spans), median(spans)))
    `),
    notice: "The five numbers add to 25, so the mean is 5. Sorted, the middle number is 4, so the median is 4.",
    checks: [
      {
        id: "center-output",
        prompt: "What two numbers are printed?",
        options: [
          { id: "a", label: "5 4" },
          { id: "b", label: "4 5" },
          { id: "c", label: "9 2" },
        ],
        answer: "a",
        explanation: "mean is first and is 5. median is second and is 4. The 9 raises the average above the middle.",
      },
    ],
  },
  {
    id: "spread",
    chapter: "Summaries",
    title: "sd measures spread around the mean",
    summary:
      "sd is the standard deviation, the usual square-root measure of how far the numbers sit from their mean. round keeps two digits so the printed value is short.",
    code: r(`
      spans <- c(2, 4, 4, 6, 9)
      print(round(sd(spans), 2))
    `),
    notice:
      "The mean of these spans is 5. sd uses the sample denominator, n minus 1. A vector of identical numbers would have sd 0.",
    checks: [
      {
        id: "spread-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "2.65" },
          { id: "b", label: "0" },
          { id: "c", label: "5" },
        ],
        answer: "a",
        explanation: "The deviations from 5 are -3, -1, -1, 1, and 4. Their sample standard deviation, rounded to two digits, is 2.65.",
      },
    ],
  },
  {
    id: "frequency",
    chapter: "Summaries",
    title: "table counts each category",
    summary:
      "table tallies how often each distinct value appears. The name in double brackets picks one of those tallies.",
    code: r(`
      skies <- c("clear", "cloud", "clear", "clear")
      print(table(skies)[["clear"]])
    `),
    notice: "cloud appears once. clear appears three times. A factor is not required. table works on a character vector.",
    checks: [
      {
        id: "freq-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "3" },
          { id: "b", label: "1" },
          { id: "c", label: "4" },
        ],
        answer: "a",
        explanation: "Three of the four values are clear. table(skies)[[\"clear\"]] is that count.",
      },
    ],
  },
  {
    id: "correlation",
    chapter: "Summaries",
    title: "cor is 1 when the points are a straight rise",
    summary:
      "cor(span, knots) is the Pearson correlation. It is 1 when one vector is a straight increasing line of the other, and -1 when that line falls.",
    code: r(`
      span <- c(2, 4, 6)
      knots <- c(3, 5, 7)
      print(cor(span, knots))
    `),
    notice: "knots is span plus 1. Adding a constant and keeping a positive slope does not change this correlation. It is exactly 1.",
    checks: [
      {
        id: "cor-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "1" },
          { id: "b", label: "0" },
          { id: "c", label: "-1" },
        ],
        answer: "a",
        explanation: "The pairs lie on a line with positive slope, so the correlation is 1.",
      },
    ],
  },
  {
    id: "paired",
    chapter: "Summaries",
    title: "A paired test uses the differences",
    summary:
      "t.test(..., paired = TRUE) compares two measurements on the same units. The estimate is the mean of the differences, after minus before.",
    code: r(`
      before <- c(3, 4, 5, 6)
      after <- c(4, 6, 6, 9)
      test <- t.test(after, before, paired = TRUE)
      print(unname(test$estimate))
    `),
    notice:
      "The four differences are 1, 2, 1, and 3. Their mean is 1.75. The test also reports a p-value. This lesson prints only the mean difference.",
    checks: [
      {
        id: "paired-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "1.75" },
          { id: "b", label: "0" },
          { id: "c", label: "6.25, the mean of after" },
        ],
        answer: "a",
        explanation: "(1 + 2 + 1 + 3) / 4 is 1.75. That is the paired estimate, the mean of after minus before.",
      },
      {
        id: "paired-why",
        prompt: "What does paired = TRUE change?",
        options: [
          { id: "a", label: "The test uses the difference within each pair" },
          { id: "b", label: "The test ignores after and prints before" },
          { id: "c", label: "The test draws a histogram instead of a number" },
        ],
        answer: "a",
        explanation: "Paired means the first after belongs with the first before, and so on. The procedure runs on those differences.",
      },
    ],
  },
];
