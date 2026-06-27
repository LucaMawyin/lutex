"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const EXAMPLE_SYNTAX = `\\section(Title)

\\p(Introduction)

\\b(Hello World)
\\strong(Important text)

\\code(console.log("LuTex"))

\\large(Big text)

\\list(
- First item
- Second item
)

\\math(
a = b + c
)

\\heading(Experience)

\\center(This is centered text)`;

export default function DocumentationPage() {

    const router = useRouter();

    return (
        <div className="flex flex-col max-w-3xl mx-auto p-6 gap-8">
            
            <header className="space-y-2">
                <a href="/">&lt; Return to Main Page</a>
                <h1 className="text-[2.5em]! font-bold">LuTex Documentation</h1>
                <p className="text-gray-600">
                    A simple LaTeX-to-PDF generator using custom intuitive syntax.
                </p>
            </header>

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-gray-700">
                    LuTex allows you to write LaTeX-like input in a text editor and convert it into a downloadable PDF.
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
                    LuTex uses a lightweight custom syntax that compiles into LaTeX commands before generating a PDF.
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

                <h3 className="font-semibold text-gray-800">Math</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\math(...)</code> → Math environment (align-based backend)</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Environments</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\list</code> → itemize environment</li>
                    <li><code>\enumerate</code> → enumerate environment</li>
                    <li><code>\center</code> → centered block</li>
                    <li><code>\document</code> → document wrapper</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Example</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
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
                &copy; LuTex {new Date().getFullYear()}
            </footer>
        </div>
    );
}