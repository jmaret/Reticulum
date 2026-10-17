export type Choice = {
  id: string;
  label: string;
};

export type Check = {
  id: string;
  prompt: string;
  options: Choice[];
  answer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  code: string;
  notice: string;
  aside?: string;
  checks: Check[];
};

export function r(code: string): string {
  const lines = code.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const pad = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => Math.min(min, line.match(/^ */)?.[0].length ?? 0), 80);
  return lines.map((line) => line.slice(pad)).join("\n");
}

export const lessons: Lesson[] = [
  {
    id: "script",
    chapter: "A small program",
    title: "The file runs from the top",
    summary:
      "An R file is executed from the first line to the last. There is no main function that the language looks for. A line runs when the reader reaches it.",
    code: r(`
      print("The net holds still.")
    `),
    notice:
      "print writes a character vector, and it shows the index [1] in front of the text. The programs on this page are base R.",
    checks: [
      {
        id: "script-entry",
        prompt: "Where does this program start?",
        options: [
          { id: "a", label: "Inside a main function the language calls for you" },
          { id: "b", label: "At the top of the file. The print line runs because it is reached." },
          { id: "c", label: "Only after you define a function with the same name as the file" },
        ],
        answer: "b",
        explanation:
          "R reads the file from the top. This file has one statement, so that statement runs. Nothing is waiting to be called.",
      },
      {
        id: "script-output",
        prompt: "What text is inside the printed line?",
        options: [
          { id: "a", label: "The net holds still." },
          { id: "b", label: "print" },
          { id: "c", label: "Nothing. print only prepares the text." },
        ],
        answer: "a",
        explanation: "The quotes hold the text that print writes. The [1] beside it is the index, not part of the text.",
      },
    ],
  },
  {
    id: "printing",
    chapter: "A small program",
    title: "sprintf fills a placeholder",
    summary:
      "sprintf builds a string. %d is a placeholder for an integer. The value after the format string is filled in when the line runs.",
    code: r(`
      knots <- 12
      print(sprintf("Knots: %d", knots))
    `),
    notice: "%d is not printed. It is replaced by 12. A plain paste of the characters %d would leave them as they are.",
    checks: [
      {
        id: "print-output",
        prompt: "What text is inside the printed line?",
        options: [
          { id: "a", label: "Knots: %d" },
          { id: "b", label: "Knots: 12" },
          { id: "c", label: "knots" },
        ],
        answer: "b",
        explanation: "The placeholder takes the value 12. The rest of the format string is written as it appears.",
      },
      {
        id: "print-d",
        prompt: "What does %d do?",
        options: [
          { id: "a", label: "It marks a place where an integer is filled in" },
          { id: "b", label: "It sends the text to the error stream" },
          { id: "c", label: "It means the call can fail" },
        ],
        answer: "a",
        explanation: "%d is part of the format. sprintf replaces it with the number you pass.",
      },
    ],
  },
  {
    id: "project",
    chapter: "A small program",
    title: "A project is a directory",
    summary:
      "A small program can be one file. A project is a directory around it. hello.R holds the program you run. A package, later, adds a DESCRIPTION file and an R directory. This lesson stops at the script.",
    code: r(`
      # reticulum-field/
      # ├── hello.R
      # └── README.md
      #
      # Rscript hello.R
      print("The net holds still.")
    `),
    notice:
      "Try it runs the snippet, not the directory. On your own machine, Rscript hello.R runs that file from the project directory.",
    checks: [
      {
        id: "project-file",
        prompt: "Which file is the program?",
        options: [
          { id: "a", label: "hello.R" },
          { id: "b", label: "README.md" },
          { id: "c", label: "The directory name reticulum-field" },
        ],
        answer: "a",
        explanation: "hello.R is the script. README.md is a note for a person. The directory only holds them.",
      },
      {
        id: "project-run",
        prompt: "How do you run that file from a terminal?",
        options: [
          { id: "a", label: "Rscript hello.R" },
          { id: "b", label: "print hello.R" },
          { id: "c", label: "The directory runs itself when you open it" },
        ],
        answer: "a",
        explanation: "Rscript runs a file. This page only runs the source in the browser when you choose Try it.",
      },
    ],
  },
  {
    id: "names",
    chapter: "Syntax",
    title: "<- binds a name",
    summary:
      "<- gives a name to a value. Writing the name again on the left replaces what the name refers to. The right-hand side is computed first.",
    code: r(`
      knots <- 12
      knots <- knots + 1
      print(knots)
    `),
    notice: "The first line binds 12. The second line reads that 12, adds 1, and binds the result back to the same name.",
    checks: [
      {
        id: "names-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "13" },
          { id: "c", label: "1" },
        ],
        answer: "b",
        explanation: "knots + 1 is 13, and that value is what the name knots refers to when print runs.",
      },
      {
        id: "names-arrow",
        prompt: "What does the arrow do?",
        options: [
          { id: "a", label: "It binds the value on the right to the name on the left" },
          { id: "b", label: "It compares the two sides and prints TRUE or FALSE" },
          { id: "c", label: "It sends the value to a file" },
        ],
        answer: "a",
        explanation: "<- is assignment. The name is on the left. The value is on the right.",
      },
    ],
  },
  {
    id: "types",
    chapter: "Syntax",
    title: "A value has a type",
    summary:
      "typeof reports how a value is stored. A bare 12 is a double. 12L is an integer. Text is character. TRUE and FALSE are logical.",
    code: r(`
      span <- 12
      span_l <- 12L
      name <- "Reticulum"
      open <- TRUE
      print(c(typeof(span), typeof(span_l), typeof(name), typeof(open)))
    `),
    notice:
      "class(12) says numeric. typeof(12) says double. numeric is the class name people use for that double. Character has no separate one-letter type.",
    checks: [
      {
        id: "types-output",
        prompt: "What four types are printed?",
        options: [
          { id: "a", label: "double, integer, character, logical" },
          { id: "b", label: "numeric, numeric, string, bool" },
          { id: "c", label: "integer, integer, character, logical" },
        ],
        answer: "a",
        explanation: "12 is stored as double. The L suffix stores an integer. The quotes store character. TRUE is logical.",
      },
      {
        id: "types-l",
        prompt: "What does the L in 12L do?",
        options: [
          { id: "a", label: "It stores the value as an integer" },
          { id: "b", label: "It makes the number a length in letters" },
          { id: "c", label: "It marks the value as missing" },
        ],
        answer: "a",
        explanation: "The L suffix is how you write an integer. Without it, a whole number is still a double.",
      },
    ],
  },
  {
    id: "functions",
    chapter: "Syntax",
    title: "The last value is returned",
    summary:
      "function builds a function. The body runs when you call it. The value of the last expression is what the call returns. return() can say the same thing, and you do not need it here.",
    code: r(`
      meters <- function(span) {
        span * 2
      }
      print(meters(6))
    `),
    notice: "span * 2 is the last expression, so the call returns that product. The name meters refers to the function.",
    checks: [
      {
        id: "fn-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "6" },
          { id: "b", label: "12" },
          { id: "c", label: "2" },
        ],
        answer: "b",
        explanation: "meters(6) evaluates 6 * 2. print writes 12.",
      },
      {
        id: "fn-return",
        prompt: "What does the call return?",
        options: [
          { id: "a", label: "The value of the last expression in the body" },
          { id: "b", label: "Nothing, unless the body contains return()" },
          { id: "c", label: "The name span" },
        ],
        answer: "a",
        explanation: "R returns the last value. return() is a way to leave early, not a requirement on every function.",
      },
    ],
  },
  {
    id: "flow",
    chapter: "Syntax",
    title: "if chooses, for walks the values",
    summary:
      "if runs one branch. for walks each value in a vector, not each index. The braces group the lines that belong to that branch or that step.",
    code: r(`
      spans <- c(3, 5, 8)
      total <- 0
      for (span in spans) {
        if (span > 4) {
          total <- total + span
        }
      }
      print(total)
    `),
    notice: "3 is not greater than 4, so it is skipped. 5 and 8 are added. The name span is the value itself on each step.",
    checks: [
      {
        id: "flow-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "16" },
          { id: "b", label: "13" },
          { id: "c", label: "3" },
        ],
        answer: "b",
        explanation: "Only 5 and 8 pass the test. 5 + 8 is 13.",
      },
      {
        id: "flow-for",
        prompt: "What is span on each step?",
        options: [
          { id: "a", label: "The next value from spans: 3, then 5, then 8" },
          { id: "b", label: "The index: 1, then 2, then 3" },
          { id: "c", label: "Always the whole vector" },
        ],
        answer: "a",
        explanation: "for (name in vector) binds the name to each element. It does not bind the position.",
      },
    ],
  },
  {
    id: "lists",
    chapter: "Data",
    title: "A list holds named pieces",
    summary:
      "list builds a list. A name in the call becomes a name you can use with $. $ pulls out that piece.",
    code: r(`
      pier <- list(name = "North", span = 12)
      print(pier$span)
    `),
    notice: "pier[[\"span\"]] is the same piece. $ is the short form when the name is a fixed word in the source.",
    checks: [
      {
        id: "list-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "North" },
          { id: "c", label: "span" },
        ],
        answer: "a",
        explanation: "pier$span is the piece stored under the name span, which is 12.",
      },
      {
        id: "list-dollar",
        prompt: "What does $ do?",
        options: [
          { id: "a", label: "It extracts the piece with that name" },
          { id: "b", label: "It adds the two sides as numbers" },
          { id: "c", label: "It checks that the list has only one type" },
        ],
        answer: "a",
        explanation: "The word after $ is a name in the list. The value of that piece is the result.",
      },
    ],
  },
  {
    id: "switch",
    chapter: "Data",
    title: "switch picks a branch by name",
    summary:
      "switch chooses one value by matching a string to a name. The matching value is the result. If nothing matches, the result is NULL.",
    code: r(`
      kind <- "star"
      label <- switch(kind, star = "point", line = "edge")
      print(label)
    `),
    notice: "kind is the string star, so the branch named star is chosen. The branch named line is not evaluated as the result.",
    checks: [
      {
        id: "switch-output",
        prompt: "What text is printed?",
        options: [
          { id: "a", label: "point" },
          { id: "b", label: "edge" },
          { id: "c", label: "star" },
        ],
        answer: "a",
        explanation: "The name star matches the first branch. Its value is the string point.",
      },
      {
        id: "switch-miss",
        prompt: "What would switch return if kind were \"knot\"?",
        options: [
          { id: "a", label: "NULL, because no branch has that name" },
          { id: "b", label: "point, because it is the first branch" },
          { id: "c", label: "An error, because a missing name is fatal" },
        ],
        answer: "a",
        explanation: "A character switch with no matching name and no unnamed default returns NULL.",
      },
    ],
  },
  {
    id: "vectors",
    chapter: "Data",
    title: "A vector recycles",
    summary:
      "c() builds an atomic vector. Arithmetic pairs elements. If one vector is shorter, R repeats it to the length of the longer one when the lengths fit.",
    code: r(`
      spans <- c(2, 4)
      print(spans + c(1, 1, 1, 1))
    `),
    notice:
      "The length 2 repeats twice to cover the length 4. If the longer length were not a multiple of the shorter one, R would still recycle and also warn.",
    checks: [
      {
        id: "vec-output",
        prompt: "What numbers are printed?",
        options: [
          { id: "a", label: "3 5 3 5" },
          { id: "b", label: "3 5" },
          { id: "c", label: "2 4 1 1" },
        ],
        answer: "a",
        explanation: "2 and 4 are reused: 2+1, 4+1, 2+1, 4+1.",
      },
      {
        id: "vec-recycle",
        prompt: "Why is the result four numbers long?",
        options: [
          { id: "a", label: "The shorter vector is repeated to the length of the longer one" },
          { id: "b", label: "c() always returns four numbers" },
          { id: "c", label: "The extra ones are ignored" },
        ],
        answer: "a",
        explanation: "Elementwise arithmetic uses the longer length. The shorter vector is recycled to match it.",
      },
    ],
  },
  {
    id: "copy",
    chapter: "The R idea",
    title: "A change copies",
    summary:
      "Two names can refer to the same vector. Changing one name through [<- gives that name a new vector. The other name still sees the original.",
    code: r(`
      knots <- c(12)
      other <- knots
      knots[1] <- 15
      print(c(knots[1], other[1]))
    `),
    notice:
      "This is copy-on-modify. The assignment knots[1] <- 15 does not write into a shared vector. other still holds 12.",
    checks: [
      {
        id: "copy-output",
        prompt: "What two numbers are printed?",
        options: [
          { id: "a", label: "15 15" },
          { id: "b", label: "15 12" },
          { id: "c", label: "12 12" },
        ],
        answer: "b",
        explanation: "knots was replaced with a vector whose first element is 15. other was not part of that assignment.",
      },
      {
        id: "copy-why",
        prompt: "Why does other stay 12?",
        options: [
          { id: "a", label: "Modifying knots copies, so other still refers to the original vector" },
          { id: "b", label: "c() stores a number that cannot change" },
          { id: "c", label: "print always writes the first value twice" },
        ],
        answer: "a",
        explanation: "The modify step copies. The name you assign to gets the copy. The other name does not.",
      },
    ],
  },
  {
    id: "environments",
    chapter: "The R idea",
    title: "An environment is shared",
    summary:
      "An environment is the case that does not copy when you change a binding inside it. Two names can refer to one environment, and a change through one name is visible through the other.",
    code: r(`
      net <- new.env()
      net$knots <- 12
      other <- net
      net$knots <- 15
      print(other$knots)
    `),
    notice:
      "other <- net does not duplicate the environment. net$knots <- 15 replaces a binding inside that same environment.",
    checks: [
      {
        id: "env-output",
        prompt: "What number is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "15" },
          { id: "c", label: "NULL" },
        ],
        answer: "b",
        explanation: "other and net refer to one environment. The binding knots inside it is 15 when print runs.",
      },
      {
        id: "env-share",
        prompt: "Why is this different from changing a vector?",
        options: [
          { id: "a", label: "Changing a binding in an environment does not copy the environment" },
          { id: "b", label: "new.env() stores a vector, and vectors are always shared" },
          { id: "c", label: "$ always copies the value on the right" },
        ],
        answer: "a",
        explanation: "Vectors copy when you modify them. Environments are reference objects. The assignment changes one shared binding.",
      },
    ],
  },
  {
    id: "absence",
    chapter: "The R idea",
    title: "NA is missing, NULL is absent, stop fails",
    summary:
      "NA is a missing value of some type. NULL means there is no value. stop signals an error. tryCatch can catch that error and return something else.",
    code: r(`
      safe <- function(text) {
        tryCatch(
          {
            value <- suppressWarnings(as.numeric(text))
            if (is.na(value)) stop("not a number")
            value
          },
          error = function(e) NULL
        )
      }
      print(safe("12"))
      print(is.null(safe("knot")))
    `),
    notice:
      "as.numeric(\"knot\") would be NA and a warning. This function treats that NA as failure and calls stop. The error handler returns NULL, so the program continues.",
    checks: [
      {
        id: "absence-good",
        prompt: "What does safe(\"12\") return?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "NULL" },
          { id: "c", label: "NA" },
        ],
        answer: "a",
        explanation: "\"12\" becomes the number 12, which is not NA, so stop is not called and that number is returned.",
      },
      {
        id: "absence-bad",
        prompt: "What does safe(\"knot\") return?",
        options: [
          { id: "a", label: "NULL, because the error handler returns NULL" },
          { id: "b", label: "NA, because as.numeric produces NA" },
          { id: "c", label: "The program stops, because stop cannot be caught" },
        ],
        answer: "a",
        explanation:
          "The text is not a number, so the function calls stop. tryCatch runs the error function, and that function returns NULL.",
      },
    ],
  },
];

export function chapterId(chapter: string): string {
  return chapter
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function lessonsByChapter(source: Lesson[] = lessons): { chapter: string; lessons: Lesson[] }[] {
  const order: string[] = [];
  const groups = new Map<string, Lesson[]>();
  for (const lesson of source) {
    const group = groups.get(lesson.chapter);
    if (group) {
      group.push(lesson);
    } else {
      order.push(lesson.chapter);
      groups.set(lesson.chapter, [lesson]);
    }
  }
  return order.map((chapter) => ({ chapter, lessons: groups.get(chapter) ?? [] }));
}
