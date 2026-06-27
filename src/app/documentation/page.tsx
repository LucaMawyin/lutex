export const metadata = {
    title: "LuTex Documentation",
};

export default function DocumentationPage() {
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
                    LuTex uses a lightweight custom syntax that compiles into LaTeX before PDF generation. LaTex syntax is also supported, and encouraged in instances where custom syntax has not been properly implemented.
                </p>

                <h3 className="font-semibold text-gray-800">Structure Commands</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\section(text)</code> → Section heading</li>
                    <li><code>\sub(text)</code> → Subsection</li>
                    <li><code>\subsub(text)</code> → Subsubsection</li>
                    <li><code>\p(text)</code> → Paragraph heading</li>
                    <li><code>\sp(text)</code> → Subparagraph heading</li>
                    <li><code>\heading(text)</code> → Styled section divider (custom LuTex heading)</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Text Formatting</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\b(text)</code> → Bold text</li>
                    <li><code>\i(text)</code> → Italic text</li>
                    <li><code>\u(text)</code> → Underlined text</li>
                    <li><code>\em(text)</code> → Emphasized text</li>
                    <li><code>\strong(text)</code> → Strong bold text</li>
                    <li><code>\code(text)</code> → Inline code / monospace</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Text Size</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\small(text)</code> → Smaller text</li>
                    <li><code>\large(text)</code> → Larger text</li>
                    <li><code>\huge(text)</code> → Extra large text</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Lists</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\list(...)</code> → Bullet list</li>
                    <li><code>\enumerate(...)</code> → Numbered list</li>
                    <li>List items must start with <code>- item</code> or <code>-item</code></li>
                </ul>

                <h3 className="font-semibold text-gray-800">Other</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\center(...)</code> → Centered text block</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Example</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`\\section(Title)

\\p(Introduction)

\\b(Hello World)

\\strong(Important text)

\\code(console.log("LuTex"))

\\large(Big text)

\\list(
- First item
- Second item
)

\\heading(Experience)

\\center(This is centered text)`}
                </pre>

                <h3 className="font-semibold text-gray-800">Notes</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>All commands use parentheses, not braces.</li>
                    <li>Formatting commands are inline.</li>
                    <li>Size commands affect visual scale only.</li>
                    <li>Lists are still based on <code>-</code> items.</li>
                    <li>Nested environments are not fully supported yet.</li>
                    <li>Parser is regex-based, so keep structure simple.</li>
                </ul>
            </section>
            <footer className="pt-6 text-sm text-gray-500 self-center">
                &copy; LuTex {new Date().getFullYear()}
            </footer>
        </div>
    );
}