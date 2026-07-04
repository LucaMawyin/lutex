import re
import regex

COMMANDS = {
    r"\section": (r"\section", "block"),
    r"\sub": (r"\subsection", "block"),
    r"\subsub": (r"\subsubsection", "block"),
    r"\heading": (r"\ressection", "block"),
    r"\p": (r"\paragraph", "block"),
    r"\sp": (r"\subparagraph", "block"),
    "-": (r"\item", "block"),

    r"\b": (r"\textbf", "inline"),
    r"\i": (r"\textit", "inline"),
    r"\u": (r"\underline", "inline"),
    r"\tt": (r"\texttt", "inline"),
    r"\em": (r"\emph", "inline"),
    r"\strong": (r"\textbf", "inline"),
    r"\code": (r"\texttt", "inline"),
    r"\small": (r"\small", "inline"),
    r"\large": (r"\large", "inline"),
    r"\huge": (r"\huge", "inline"),

    # Math characters
    r"\{" : (r"\left", "inline"),
    r"\}" : (r"\left", "inline"),
    r"\~": (r"\textasciitilde{}", "inline"),
    r"\^": (r"\textasciicircum{}", "inline"),

    # Arrows
    r"\->": (r"\rightarrow", "inline"),
    r"\<-": (r"\leftarrow", "inline"),
    r"\=>": (r"\Rightarrow", "inline"),
    r"\<=": (r"\Leftarrow", "inline"),

    # common shorthand math symbols
    r"\infty": (r"\infty", "inline"),
    r"\n": (r"\\", "inline"),
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

nested_string = r"""
\section(Nested Command Demo)

This sentence contains \b(bold text with \i(italic inside bold) for emphasis).

Here is \i(italic text containing \b(bold words) and \u(underlined words)).

Nested formatting can go deeper:
\b(Bold starts \i(then italic \u(then underline) back to italic) back to bold).

Code formatting can also contain emphasis:
\code(print("Hello") with \em(emphasized explanation)).

A paragraph with several nested commands:
\p(Inside this paragraph we have \strong(very important \i(italic detail) that also includes \code(sample_code())) before continuing.)

Size commands may also contain formatting:
\large(This is large text with \b(bold words) and \i(italic words).)

\section(Multiple Levels)

\strong(
    Strong text with
    \b(
        bold containing
        \i(
            italic containing
            \u(
                underlined text
            )
        )
    )
)

\sub(Complex Example)

This demonstrates mixed nesting:
\b(The quick \i(brown \u(fox)) jumps) over the lazy dog.

Another example:
\em(Emphasized text with \code(inline_code(\b(argument)))).

\section(End)

Everything above is intentionally nested to test recursive parsing.
"""



def convert_commands(text: str):
    pattern = regex.compile(r'(\\[a-zA-Z]+)\((?P<inner>(?:[^()]|\((?P>inner)\))*)\)')
    matches = list(pattern.finditer(text))
    if not matches:
        return text

    new_string = ""
    last = 0
    for m in matches:
        new_string += text[last:m.start()]

        cmd = m.group(1)
        inner = m.group("inner")

        new_string = new_string + (f"{COMMANDS[cmd][0]}{{{convert_commands(inner)}}}")

        last = m.end()

    new_string += text[last:]
    return new_string
    

result = convert_commands(nested_string)
print("*"*15 + "RESULTS" + "*"*15)
print(result)