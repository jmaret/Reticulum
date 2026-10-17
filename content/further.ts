import { r, type Lesson } from "./lessons";

export const furtherLessons: Lesson[] = [
  {
    id: "s3",
    chapter: "Shared behavior",
    title: "A method is chosen from the class",
    summary:
      "UseMethod looks at the class of the argument and calls the function whose name is the generic, a dot, and that class. meters.pier runs because the value was given class \"pier\".",
    code: r(`
      meters <- function(x) {
        UseMethod("meters")
      }
      meters.pier <- function(x) {
        x$span
      }
      pier <- structure(list(span = 12), class = "pier")
      print(meters(pier))
    `),
    notice: "structure attaches the class. Nothing registers the method ahead of time beyond defining a function with that name.",
    checks: [
      {
        id: "s3-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "pier" },
          { id: "c", label: "meters" },
        ],
        answer: "a",
        explanation: "meters.pier returns the span piece, which is 12.",
      },
      {
        id: "s3-dispatch",
        prompt: "Why is meters.pier the function that runs?",
        options: [
          { id: "a", label: "The class of the argument is pier, so UseMethod looks for meters.pier" },
          { id: "b", label: "R always calls the last function that was defined" },
          { id: "c", label: "The name of the list is pier" },
        ],
        answer: "a",
        explanation: "Dispatch uses the class attribute. The generic name plus that class names the method.",
      },
    ],
  },
  {
    id: "wider",
    chapter: "Shared behavior",
    title: "One generic, two classes",
    summary:
      "The same generic can have a method for each class. The caller writes meters(x). The class of x decides which body runs.",
    code: r(`
      meters <- function(x) UseMethod("meters")
      meters.pier <- function(x) x$span
      meters.span <- function(x) unclass(x)
      pier <- structure(list(span = 12), class = "pier")
      bare <- structure(8, class = "span")
      print(c(meters(pier), meters(bare)))
    `),
    notice: "unclass drops the class attribute so the number 8 can sit in a numeric vector with the other result.",
    checks: [
      {
        id: "wider-output",
        prompt: "What two numbers are printed?",
        options: [
          { id: "a", label: "12 8" },
          { id: "b", label: "8 12" },
          { id: "c", label: "12 12" },
        ],
        answer: "a",
        explanation: "The pier method returns the span 12. The span method returns the underlying number 8.",
      },
      {
        id: "wider-call",
        prompt: "What does the caller have to name?",
        options: [
          { id: "a", label: "The generic meters. The class selects the method." },
          { id: "b", label: "meters.pier or meters.span, chosen by hand" },
          { id: "c", label: "The word structure" },
        ],
        answer: "a",
        explanation: "Both calls are written meters(...). UseMethod picks the body from the class.",
      },
    ],
  },
  {
    id: "kept",
    chapter: "Shared behavior",
    title: "A nested function sees the enclosing names",
    summary:
      "A function defined inside another function looks for names in the enclosing environment when its own body does not bind them.",
    code: r(`
      outer_span <- 4
      show <- function() {
        inner <- function() outer_span
        inner()
      }
      print(show())
    `),
    notice:
      "inner does not bind outer_span. The lookup continues outward and finds the name in the global environment.",
    checks: [
      {
        id: "kept-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "4" },
          { id: "b", label: "NULL" },
          { id: "c", label: "The call fails, because inner cannot see outer_span" },
        ],
        answer: "a",
        explanation: "outer_span is found by walking out from inner's environment. Its value is 4.",
      },
      {
        id: "kept-where",
        prompt: "Where is outer_span found?",
        options: [
          { id: "a", label: "By looking outward from the function that uses it" },
          { id: "b", label: "Only if it is an argument of inner" },
          { id: "c", label: "Only inside the quotes of a string" },
        ],
        answer: "a",
        explanation: "R resolves a free name in the enclosing environments. inner does not need the name as an argument.",
      },
    ],
  },
  {
    id: "packages",
    chapter: "Shared behavior",
    title: "A package name and ::",
    summary:
      ":: calls a function from a package without attaching the package. stats ships with R, so median is available this way on a normal install.",
    code: r(`
      print(stats::median(c(3, 9, 4)))
    `),
    notice:
      "This page does not install packages. :: is the call. library(stats) would attach the package so you could write median without the prefix.",
    checks: [
      {
        id: "pkg-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "4" },
          { id: "b", label: "9" },
          { id: "c", label: "3" },
        ],
        answer: "a",
        explanation: "The sorted values are 3, 4, 9. The middle one is 4.",
      },
      {
        id: "pkg-colon",
        prompt: "What does stats:: do?",
        options: [
          { id: "a", label: "It takes median from the stats package" },
          { id: "b", label: "It installs stats from the internet" },
          { id: "c", label: "It turns the vector into a data frame" },
        ],
        answer: "a",
        explanation: ":: selects an export from a package. stats is part of the R distribution.",
      },
    ],
  },
  {
    id: "lapply",
    chapter: "Functions over vectors",
    title: "lapply calls a function on each piece",
    summary:
      "lapply walks a list and calls a function on each element. The result is a list. unlist flattens that list into an atomic vector when every piece is a single number.",
    code: r(`
      spans <- list(3, 5, 8)
      doubled <- lapply(spans, function(span) span * 2)
      print(unlist(doubled))
    `),
    notice: "The function is written where it is used. It has one argument, the current piece.",
    checks: [
      {
        id: "lapply-output",
        prompt: "What numbers are printed?",
        options: [
          { id: "a", label: "6 10 16" },
          { id: "b", label: "3 5 8" },
          { id: "c", label: "2 2 2" },
        ],
        answer: "a",
        explanation: "Each span is doubled: 6, 10, and 16. unlist writes them as one vector.",
      },
      {
        id: "lapply-shape",
        prompt: "What does lapply return before unlist?",
        options: [
          { id: "a", label: "A list with one result per element" },
          { id: "b", label: "A single number, the last result" },
          { id: "c", label: "The original list, unchanged" },
        ],
        answer: "a",
        explanation: "lapply always returns a list, one piece for each input, in the same order.",
      },
    ],
  },
  {
    id: "factory",
    chapter: "Functions over vectors",
    title: "A function can return a function",
    summary:
      "The returned function keeps the names from the call that built it. factor here is the argument of scale_by, and double still sees that value later.",
    code: r(`
      scale_by <- function(factor) {
        function(span) span * factor
      }
      double <- scale_by(2)
      print(double(6))
    `),
    notice: "scale_by(2) returns a function. That function multiplies by the 2 from the call that created it.",
    checks: [
      {
        id: "factory-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "6" },
          { id: "c", label: "2" },
        ],
        answer: "a",
        explanation: "double multiplies 6 by the factor 2. The product is 12.",
      },
      {
        id: "factory-keep",
        prompt: "Where does the 2 come from when double(6) runs?",
        options: [
          { id: "a", label: "From the call scale_by(2), kept by the returned function" },
          { id: "b", label: "From an argument of double, because every function receives factor" },
          { id: "c", label: "From the number 6, used twice" },
        ],
        answer: "a",
        explanation: "The inner function closes over factor. double was built with factor equal to 2.",
      },
    ],
  },
  {
    id: "mixed",
    chapter: "Functions over vectors",
    title: "A list can hold different types",
    summary:
      "An atomic vector holds one type. A list can hold a number, text, and a logical value side by side. [[ picks one piece by position.",
    code: r(`
      pieces <- list(12, "net", TRUE)
      print(c(typeof(pieces[[1]]), typeof(pieces[[2]]), typeof(pieces[[3]])))
    `),
    notice: "The index starts at 1. pieces[[1]] is the number, not a list that contains the number.",
    checks: [
      {
        id: "mixed-output",
        prompt: "What three types are printed?",
        options: [
          { id: "a", label: "double, character, logical" },
          { id: "b", label: "list, list, list" },
          { id: "c", label: "integer, string, bool" },
        ],
        answer: "a",
        explanation: "Each piece keeps its own type. 12 is double, the text is character, and TRUE is logical.",
      },
      {
        id: "mixed-index",
        prompt: "What does pieces[[2]] return?",
        options: [
          { id: "a", label: "The character string net" },
          { id: "b", label: "A list whose only element is net" },
          { id: "c", label: "12" },
        ],
        answer: "a",
        explanation: "[[ extracts the element itself. The second element is the string net.",
      },
    ],
  },
  {
    id: "factor",
    chapter: "Tables",
    title: "A factor stores categories as codes",
    summary:
      "factor turns text into a set of levels and a vector of integer codes. The levels are sorted unless you set them yourself. as.integer shows the codes.",
    code: r(`
      skies <- factor(c("clear", "cloud", "clear"))
      print(as.integer(skies))
    `),
    notice: "The levels are clear and cloud, in alphabetical order. clear is code 1. cloud is code 2.",
    checks: [
      {
        id: "factor-output",
        prompt: "What numbers are printed?",
        options: [
          { id: "a", label: "1 2 1" },
          { id: "b", label: "1 1 2" },
          { id: "c", label: "clear cloud clear" },
        ],
        answer: "a",
        explanation: "Both clear values share the first level. cloud is the second level. The codes are 1, 2, 1.",
      },
      {
        id: "factor-why",
        prompt: "Why is clear the code 1?",
        options: [
          { id: "a", label: "It is the first level after the levels are sorted" },
          { id: "b", label: "It is the first word in the vector, and order of appearance is the order of levels" },
          { id: "c", label: "as.integer always starts at the length of the vector" },
        ],
        answer: "a",
        explanation: "By default the levels are the sorted unique values. clear comes before cloud.",
      },
    ],
  },
  {
    id: "frame",
    chapter: "Tables",
    title: "A data frame is a list of columns",
    summary:
      "data.frame builds columns of equal length. $ still extracts a column by name. The column is a vector, so [1] is its first element.",
    code: r(`
      piers <- data.frame(name = c("North", "South"), span = c(12, 8))
      print(piers$span[1])
    `),
    notice: "name and span each have two values, one per row. A data frame will not accept columns of different lengths unless those lengths recycle cleanly.",
    checks: [
      {
        id: "frame-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "8" },
          { id: "c", label: "North" },
        ],
        answer: "a",
        explanation: "piers$span is the column c(12, 8). The first element is 12.",
      },
      {
        id: "frame-shape",
        prompt: "What is a data frame made of?",
        options: [
          { id: "a", label: "Columns of equal length, stored as a list" },
          { id: "b", label: "One atomic vector that mixes text and numbers" },
          { id: "c", label: "A factor with one level per row" },
        ],
        answer: "a",
        explanation: "Each argument to data.frame becomes a column. The columns share a length, and the object is a list.",
      },
    ],
  },
  {
    id: "formula",
    chapter: "Tables",
    title: "A formula names a relationship",
    summary:
      "knots ~ span is a formula. The left side is the value being described. The right side is what it depends on. lm fits a straight line and coef extracts the coefficients.",
    code: r(`
      piers <- data.frame(span = c(2, 4, 6), knots = c(3, 5, 7))
      fit <- lm(knots ~ span, data = piers)
      print(coef(fit)[["span"]])
    `),
    notice:
      "These three points sit on the line knots = span + 1. The coefficient named span is the slope. This lesson is the shape of a model formula, not a statistics course.",
    checks: [
      {
        id: "formula-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "1" },
          { id: "b", label: "2" },
          { id: "c", label: "3" },
        ],
        answer: "a",
        explanation: "Each step of 2 in span raises knots by 2, so the slope is 1.",
      },
      {
        id: "formula-sides",
        prompt: "In knots ~ span, which name is being described?",
        options: [
          { id: "a", label: "knots, the left-hand side" },
          { id: "b", label: "span, because it is written last" },
          { id: "c", label: "fit, the name of the result" },
        ],
        answer: "a",
        explanation: "The left side of ~ is the response. The right side is the predictor. lm estimates how the left depends on the right.",
      },
    ],
  },
  {
    id: "missing",
    chapter: "Tables",
    title: "NA spreads through a summary",
    summary:
      "A missing number inside a vector makes mean return NA, unless you remove the missing values first. na.rm = TRUE drops them before the average.",
    code: r(`
      spans <- c(4, NA, 10)
      print(c(mean(spans), mean(spans, na.rm = TRUE)))
    `),
    notice: "NA is not zero, and it is not ignored by default. The average of the remaining numbers, 4 and 10, is 7.",
    checks: [
      {
        id: "missing-output",
        prompt: "What two values are printed?",
        options: [
          { id: "a", label: "NA and 7" },
          { id: "b", label: "7 and 7" },
          { id: "c", label: "4 and 10" },
        ],
        answer: "a",
        explanation: "The first mean keeps NA, so the result is NA. The second drops NA and averages 4 and 10.",
      },
      {
        id: "missing-rm",
        prompt: "What does na.rm = TRUE do?",
        options: [
          { id: "a", label: "It removes missing values before the function computes" },
          { id: "b", label: "It replaces NA with 0" },
          { id: "c", label: "It stops the program when NA appears" },
        ],
        answer: "a",
        explanation: "na.rm means NA remove. The missing element is left out. It is not treated as zero.",
      },
    ],
  },
];
