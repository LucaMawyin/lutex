import re
import regex

COMMANDS = {
    r"\section": r"\section",
    r"\sub": r"\subsection",
    r"\subsub": r"\subsubsection",
    r"\heading": r"\ressection",
    r"\b": r"\textbf",
    r"\i": r"\textit",
    r"\u": r"\underline",
    r"\tt": r"\texttt",
    r"\em": r"\emph",
    "-" :r"\item",
    r"\strong": r"\textbf",
    r"\code": r"\texttt",
    r"\small": r"\small",
    r"\large": r"\large",
    r"\huge": r"\huge",
    r"\p": r"\paragraph",
    r"\sp": r"\subparagraph",
}
ENVIRONMENTS = {
    "list": "itemize",
    "enumerate": "enumerate",
    "math" : "align",
    "center": "center",
    "document": "document",
}


input_string = r"""
\section(Introduction)
This document demonstrates formatting using multiple commands such as \b(bold text), \i(italic text), and \u(underlined text).
We also include \tt(monospace code), \em(emphasized text), and \code(code formatting) for variety.

\heading(Main Overview)
\strong(Important first point)
\strong(Important second point)
\strong(Important third point)
\strong(Important fourth point)

\sub(Background Section)
This section shows repeated formatting using \b(bold usage again) alongside \i(italic notes).
We also demonstrate \code(code snippets), plus \small(small text) and \large(large text).

\subsub(Deep Details)
Here we go deeper using \tt(terminal style text) and \u(underlined key terms).
We also repeat \b(bold emphasis) and \i(italic emphasis) in separate sentences for clarity.

\p(Paragraph Block)
This paragraph contains \strong(strong emphasis) and normal explanatory text.
We also include \em(subtle emphasis) and \code(inline code usage) within the same paragraph.

\sp(Subparagraph Block)
Here we show size variation with \small(reduced text), \large(expanded text), and \huge(extra large text).
Each formatting style is demonstrated independently and clearly.

\section(Second Main Section)
This section continues with repeated formatting like \b(bold statements), \i(italic notes), and \u(underlined highlights).
We also include additional examples of \tt(technical style text) and \em(emphasis usage).

\heading(Summary)
The summary combines \strong(key insights), \em(soft emphasis), and \tt(technical terms).
We also use \code(code fragments) to illustrate inline syntax examples in a clean way.

\sub(Final Notes)
Final notes include \b(important closing remark), \i(secondary remark), and \u(underlined warning).
Everything remains simple, structured, and non-nested.

\subsub(Conclusion Detail)
We finish with \small(small print text), \large(prominent text), and \huge(very large heading style text).
Each size command is demonstrated independently.

\section(Appendix)
The appendix repeats all supported commands for completeness:
\b(bold example), \i(italic example), \u(underline example), \tt(typewriter example), \em(emphasis example), \code(code example), \strong(strong example).

\p(End Paragraph)
The final statement uses \strong(final emphasis) to close the document cleanly and consistently.
"""

def convert_commands(s : str):
    out = []
    stack = []

    i = 0
    while i < len(s):
        matched = False

        if s[i] == "\\":
            for cmd, latex_cmd in COMMANDS.items():
                if s.startswith(cmd + "(", i):
                    out.append(latex_cmd + "{")
                    stack.append("}")
                    i += len(cmd) + 1 # skip "\cmd("
                    matched = True
                    break
            
            if matched:
                continue

            out.append(s[i])
            i += 1

        elif s[i] == ")":
            if stack:
                out.append(stack.pop())

            i += 1
        else:
            out.append(s[i])
            i += 1
    
    return "".join(out)

print(convert_commands(input_string))