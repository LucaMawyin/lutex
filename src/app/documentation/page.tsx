"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const EXAMPLE_SYNTAX = `\\section(Welcome to LuTeX)

\\p(This is a lightweight markup system designed to make writing structured documents simple and readable.)

\\heading(Why use LuTeX?)

\\list(
- Clean, minimal syntax
- Easy to parse
- Fast to write
- No boilerplate
)

\\heading(Text Styling)

\\p(You can emphasize text using simple commands:)

\\b(Bold text shows importance)
\\strong(Strong text highlights critical information)
\\large(Large text stands out for titles or key ideas)

\\heading(Code Example)

\\code(
function greet(name) \\{
    console.log("Hello, " + name);
\\}
)

\\heading(Math Support)

\\math(
E = mc^2
)

\\p(Inline expressions like a = b + c can be used for simple formulas.)

\\heading(Layout Control)

\\center(This text is centered for emphasis)

\\p(That's it — simple, readable, and structured.)`;

const MATH_SYNTAX = `\\math(
a = b + c
)

\\math(
E = mc^2
)

\\math(
\\frac(a,b) = x^2 + y^2
)

\\math(
\\alpha + \\beta = \\gamma
)

\\math(
\\frac(1,2)
)`;

export default function DocumentationPage() {

    const router = useRouter();

    return (
        <div className="flex flex-col max-w-3xl mx-auto p-6 gap-8">
            
            <header className="space-y-2">
                <a href="/">&lt; Return to Main Page</a>
                <h1 className="text-[2.5em]! font-bold">LuTeX Documentation</h1>
                <p className="text-gray-600">
                    A simple LaTeX-to-PDF generator using custom intuitive syntax.
                </p>
            </header>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-gray-700">
                    LuTeX allows you to write LaTeX-like input in a text editor and convert it into a downloadable PDF.
                    It communicates with a backend API that processes your content and returns a generated PDF file.
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">How to Use</h2>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Type your content into the editor on the home page.</li>
                    <li>Click <strong>Download PDF</strong>.</li>
                    <li>Wait for the API to process your request.</li>
                    <li>The PDF will automatically download when ready.</li>
                </ol>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">Supported Features</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Basic LaTeX-style formatting</li>
                    <li>Environment blocks (if supported by API)</li>
                    <li>Console feedback for warnings and errors</li>
                    <li><b>Note:</b> LaTex syntax is also supported</li>
                </ul>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">Console Panel</h2>
                <p className="text-gray-700">
                    The console on the right side of the editor displays system messages such as:
                </p>

                <ul className="list-disc list-inside text-gray-700">
                    <li>Backend warnings</li>
                    <li>Compilation messages</li>
                    <li>Error responses</li>
                </ul>
            </section>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">Troubleshooting</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Make sure your input is not empty before submitting.</li>
                    <li>Check the console panel for backend error messages.</li>
                    <li>If download fails, verify API availability.</li>
                </ul>
            </section>

            <section id="syntax" className="space-y-2">
                <h2 className="text-xl font-semibold">Syntax</h2>

                <p className="text-gray-700">
                    LuTeX uses a lightweight custom syntax that compiles into LaTeX commands before generating a PDF.
                    Most commands follow the format <code>\command(text)</code>, and some shortcuts map directly to LaTeX equivalents.
                </p>

                <h3 className="font-semibold text-gray-800">Structure Commands</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\section(text)</code> → Section</li>
                    <li><code>\sub(text)</code> → Subsection</li>
                    <li><code>\subsub(text)</code> → Subsubsection</li>
                    <li><code>\p(text)</code> → Paragraph</li>
                    <li><code>\sp(text)</code> → Subparagraph</li>
                    <li><code>\heading(text)</code> → Custom section heading (mapped internally)</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Text Formatting</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\b(text)</code> or <code>\strong(text)</code> → Bold</li>
                    <li><code>\i(text)</code> → Italic</li>
                    <li><code>\u(text)</code> → Underline</li>
                    <li><code>\em(text)</code> → Emphasis</li>
                    <li><code>\code(text)</code> or <code>\tt(text)</code> → Monospace / code</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Text Size</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\small(text)</code> → Small text</li>
                    <li><code>\large(text)</code> → Large text</li>
                    <li><code>\huge(text)</code> → Huge text</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Lists</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\list(...)</code> → Bullet list (<code>itemize</code>)</li>
                    <li><code>\enumerate(...)</code> → Numbered list</li>
                    <li>
                        List items use <code>- item</code> or <code>-item</code> syntax inside the block
                    </li>
                    <li>
                        Single dash shortcut: <code>-</code> is also mapped to <code>\item</code>
                    </li>
                </ul>

                <h3 className="font-semibold text-gray-800">Math Syntax Details</h3>

                <p className="text-gray-700">
                    The <code>\math(...)</code> block is used for mathematical expressions.
                    Inside the block, you can write standard LaTeX-style math expressions,
                    but without the need for full LaTeX document syntax.
                </p>

                <ul className="list-disc list-inside text-gray-700">
                    <li>Use standard math operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code></li>
                    <li>
                        Fractions: <code>\frac(a,b)</code> → renders as a/b in LaTeX
                    </li>                    
                    <li>Exponents: <code>a^2</code></li>
                    <li>Subscripts: <code>a_1</code></li>
                    <li>Greek letters (if supported by backend): <code>\alpha, \beta, \gamma</code></li>
                </ul>

                <h4 className="font-semibold text-gray-800">Examples</h4>

                <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap wrap-break-words overflow-x-hidden">
{MATH_SYNTAX}
                </pre>
                <Button
                    text="Load Example"
                    className="block mx-auto"
                    onClick={() => {
                        localStorage.setItem("LuTexExample", MATH_SYNTAX)
                        router.push("/")
                    }}
                />

                <p className="text-gray-700">
                    Note: All expressions are parsed as a single math block. Multi-line alignment
                    and advanced LaTeX environments (like <code>align</code>) may not be fully supported.
                </p>

                <h3 className="font-semibold text-gray-800">Environments</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\list</code> → itemize environment</li>
                    <li><code>\enumerate</code> → enumerate environment</li>
                    <li><code>\center</code> → centered block</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Example</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap wrap-break-words overflow-x-hidden">
{EXAMPLE_SYNTAX}
                </pre>
                <Button
                    text="Load Example"
                    className="block mx-auto"
                    onClick={() => {
                        localStorage.setItem("LuTexExample", EXAMPLE_SYNTAX)
                        router.push("/")
                    }}
                />

                <h3 className="font-semibold text-gray-800">Notes</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>All commands use parentheses instead of LaTeX braces.</li>
                    <li>Most commands are wrappers around LaTeX equivalents.</li>
                    <li>Parser is regex-based — avoid deeply nested structures.</li>
                    <li>Some features (like math and environments) depend on backend support.</li>
                </ul>

            </section>
            <footer className="pt-6 text-sm text-gray-500 self-center">
                &copy; LuTeX {new Date().getFullYear()}
            </footer>
        </div>
    );
}