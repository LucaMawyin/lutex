import os
import glob
from flask import Flask, request, Response
from flask_cors import CORS
from pylatex import Document, NoEscape, escape_latex
from datetime import datetime
import uuid
import re
import regex
import subprocess

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
app = Flask(__name__)
CORS(app, expose_headers=["lutex-message"])

'''
Commands:

cd .\python\
flask --app api run --debug
'''

@app.route('/api/route', methods=['POST'])
def generate():

    form = request.get_json() or {}
    output_file = uuid.uuid4().hex

    try:
        pdf_path = create_pdf(form,output_file)

        # Store PDF to ram
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()

        return Response(
            pdf_bytes,
            mimetype="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=resume.pdf",
            }
        )
    
    except subprocess.CalledProcessError as e:
        return Response(
            str(e),
            status=500,
            mimetype="text/plain",
            headers={
                "lutex-message": f"LaTeX compilation failed: {e}"
            }
        )
        
    except Exception as e:
        print("ERROR:", e)

        return Response(
            str(e),
            status=500,
            mimetype="text/plain",
            headers={
                "lutex-message": f"ERROR: {str(e)}"
            }
        )

    
    # ALWAYS run cleanup
    finally:
        try:
            cleanup_output_files(output_file)
        except Exception as e:
            print("Cleanup error:", e)

# -------------------------
# DELETE ALL FILES
# -------------------------
def cleanup_output_files(output_file:str):
    for file_path in glob.glob(f"{output_file}*"):
        try:
            os.remove(file_path)
        except Exception as e:
            print("Failed to delete:", file_path, e)

# -------------------------
# CREATE INITIAL DOCUMENT
# -------------------------
def create_document(name: str):
    doc = Document(
        documentclass="article",
        document_options=["letterpaper"]
    )

    doc.preamble.append(NoEscape(r"""

    %% Package to control the size of a page: the standard margins used by LaTeX are
    %% very wide!
    \usepackage[margin=1in]{geometry}


    %% Packages add functionality to the document. The AMS packages are standard
    %% packages to support various mathematical notations. AMS stands for American
    %% Mathematical Society, the organization that maintains these packages.
    \usepackage{amsmath,amsthm,amssymb}

    %% Theorems-like environments using functionality provided by amsthm.
    \theoremstyle{plain}
    \newtheorem{theorem}{Theorem}[section]
        %% [section] at the end specifies that theorems should be numbered
        %% per-section: Section x starts with theorem-like x.1 and so on, ...
    \newtheorem{proposition}[theorem]{Proposition}
        %% [theorem] in the middle specifies: use the same counter as the theorem
        %% environment: here we number all theorem-like environments consecutively.
    \newtheorem{corollary}[theorem]{Corollary}
    \newtheorem{lemma}[theorem]{Lemma}
    \theoremstyle{definition}
    \newtheorem{definition}[theorem]{Definition}
    \theoremstyle{remark}
    \newtheorem{example}[theorem]{Example}
    \newtheorem{remark}[theorem]{Remark}


    %% Support for nicely formatted tables.
    \usepackage{booktabs}


    %% Support for colors & colors in tables.
    \usepackage[table]{xcolor}

    % Seven colors safe for use color blindness.
    % Colors taken from doi:10.1038/nmeth.1618.
    \definecolor{cbOrange}{RGB}{230,159,0}
    \definecolor{cbSkyBlue}{RGB}{86,180,233}
    \definecolor{cbBluishGreen}{RGB}{0,158,115}
    \definecolor{cbYellow}{RGB}{240,228,66}
    \definecolor{cbBlue}{RGB}{0,114,178}
    \definecolor{cbVermillion}{RGB}{213,94,0}
    \definecolor{cbReddischPurple}{RGB}{204,121,167}


    %% Notation used in this document.
    \newcommand{\n}{\mathbf{n}} %% Num. Replicas.
    \newcommand{\f}{\mathbf{f}} %% Num. Faulty Replicas.

    %% Misc. Math notation.
    \newcommand{\BigO}{\mathcal{O}}
    \newcommand{\abs}[1]{\lvert #1 \rvert}
    \newcommand{\AName}[1]{\textsc{#1}}
    \newcommand{\Var}[1]{\texttt{#1}}


    %% Algorithms.
    \usepackage{algorithm}
    \usepackage[noend]{algorithmic}
    \newcommand{\GETS}{:=}


    %% Formatting SI-units.
    \usepackage{siunitx}
    \sisetup{per-mode=symbol}


    %% TikZ: for creating figures.
    \usepackage{tikz}

    %% Configuration for figures: Nicer arrows.
    \usetikzlibrary{arrows.meta}
    \tikzset{>=Stealth}


    %% pgfplots: drawing plots using TikZ.
    \usepackage{pgfplots}
    %% Configuration for plots: Use color-blind friendly colors.
    \pgfplotscreateplotcyclelist{cbSafeList}{
        very thick,solid,cbOrange,every mark/.append style={solid},mark=*\\
        very thick,solid,cbSkyBlue,every mark/.append style={solid},mark=*\\
        very thick,solid,cbBluishGreen,every mark/.append style={solid},mark=*\\
        very thick,solid,cbYellow,every mark/.append style={solid},mark=*\\
        very thick,solid,cbBlue,every mark/.append style={solid},mark=*\\
        very thick,solid,cbVermillion,every mark/.append style={solid},mark=*\\
        very thick,solid,cbReddischPurple,every mark/.append style={solid},mark=*\\
        very thick,solid,black,every mark/.append style={solid},mark=*\\
    }
    \pgfplotsset{
        legend style={font=\small},
        compat=1.16,
        width=260pt,
        height=140pt,
        legend cell align=left,
        xlabel near ticks,
        ylabel near ticks,
        every axis/.append style={
            cycle list name=cbSafeList,
            ymin=0,
            enlargelimits=0.05,
            mark size=1pt,
            ylabel style={align=center},
            xlabel style={align=center},
            title style={align=center}
        }
    }

    %% PgfplotsTable: loading data files to use with pgfplots.
    \usepackage{pgfplotstable}


    %% Support for hyperlinks and urls. The setting ``colorlinks'' sets how links
    %% are shown in the document (with a color, without underline). We put hyperref
    %% last---it has a tendency to break other packages when loaded before them.
    \usepackage[colorlinks]{hyperref}
    \usepackage{graphicx}
    \usepackage{pgffor}
    \usepackage{caption}
    \usepackage{tabularx}
    \usepackage{enumitem}
    \usepackage{fancyhdr}
    \usepackage{comment}
    \newcommand{\ressection}[1]{
        \addvspace{1em}
        \noindent\textbf{\large #1}
        \par\vspace{0.3em}
        \hrule
    }
    \pagenumbering{gobble}
    """))

    # -------------------------
    # METADATA
    # -------------------------
    doc.preamble.append(NoEscape(rf"""
    \hypersetup{{
        pdftitle=LuTex Document
        pdfauthor={{}}
    }}
    """))


    return doc

# -------------------------
# CREATE FINAL PDF
# -------------------------
def create_pdf(form, output_file:str):
    doc = create_document("LuTex PDF")

    content = form.get("content", "")

    # Convert commands to LaTex commands
    content = convert_all(content)    
    doc.append(NoEscape(content))

    file_path = output_file
    doc.generate_pdf(file_path, clean_tex=False)

    return file_path + ".pdf"

# -------------------------
# LUTEX SYNTAX TO LATEX
# -------------------------
def convert_all(text: str):

    text = passthrough(text)
    text = convert_fraction(text)
    text = convert_math(text)

    for env, latex_env in ENVIRONMENTS.items():
        text = parse_blocks(text, env, latex_env)

    for cmd, (latex,kind) in COMMANDS.items():
        text = convert_command(text, cmd, latex,kind)

    

    return text

# -------------------------
# CONVERT MATH
# -------------------------
def convert_math(text: str):
    pattern = r"\\math\((.*?)\)"

    def repl(match):
        inner = match.group(1).strip()

        # convert multiline math into a single LaTeX-safe line
        lines = [
            line.strip()
            for line in inner.splitlines()
            if line.strip()
        ]

        content = " \\\\ \n".join(lines).replace("*",r"\times")

        return f"\\begin{{align*}}\n{content}\n\\end{{align*}}"

    return re.sub(pattern, repl, text, flags=re.DOTALL)

# -------------------------
# CONVERT FRACTIONS
# -------------------------
def convert_fraction(text: str):
    pattern = r"\\frac\(([^,]+),\s*([^)]+)\)"

    def repl(match):
        a = match.group(1).strip()
        b = match.group(2).strip()
        return f"\\frac{{{a}}}{{{b}}}"

    return re.sub(pattern, repl, text)

# -------------------------
# CONVERT SIMPLE COMMANDS
# -------------------------
def convert_command(text: str, cmd: str, latex_cmd: str, kind:str):
    pattern = rf"{regex.escape(cmd)}\(([^)]*)\)(\n?)"

    def repl(match):
        inner = match.group(1)
        new_line = match.group(2)
        
        base = f"{latex_cmd}{{{inner}}}"
        if new_line and kind == "inline":
            return base + r"\\"
        
        if new_line and cmd in ["\\p","\\sp"]:
            return base + r"\mbox{}"
        
        return base


    return regex.sub(pattern, repl, text, flags=regex.DOTALL)

# -------------------------
# PARSE BEGIN/END BLOCKS
# -------------------------
def parse_blocks(text, env, latex_env):
    pattern = rf"\\{env}\((.*?)\)"

    def repl(match):
        inner = match.group(1).strip()

        if latex_env in ["itemize", "enumerate"]:
            items = parse_items(inner)

            if not items and inner:
                items = [inner]

            body = "\n".join(f"\\item {i}" for i in items)
            return f"\\begin{{{latex_env}}}\n{body}\n\\end{{{latex_env}}}"
        
        elif latex_env in ["center"]:
            return f"\\begin{{{latex_env}}}\n{inner}\n\\end{{{latex_env}}}"

        return inner

    return re.sub(pattern, repl, text, flags=re.DOTALL)

def parse_items(text):
    items = []

    for line in text.splitlines():
        line = line.strip()

        if line.startswith("-"):
            item = line[1:].strip()
            if item:  # prevent empty \item
                items.append(item)

    return items

def passthrough(text: str):
    pattern = r"(\\[a-zA-Z]+)(\(([^)]*)\)|\{([^}]*)\})?"

    def repl(match):
        cmd = match.group(1)
        inner_parenthesis = match.group(3)
        inner_bracket = match.group(4)


        name = cmd.lstrip("\\")

        # known command → leave it alone
        if cmd in COMMANDS or cmd.lstrip("\\") in ENVIRONMENTS:
            return match.group(0)
        
        if inner_parenthesis is not None:
            return f"{cmd}{{{inner_parenthesis}}}"

        if inner_bracket is not None:
            return f"{cmd}{{{inner_bracket}}}"
        
        return f"$\\{name}$"


    return re.sub(pattern, repl, text, flags=re.DOTALL)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)