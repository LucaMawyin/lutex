export const metadata = {
    title: "LuTex Documentation",
};

export default function DocumentationPage() {
    return (
        <div className="flex flex-col max-w-3xl mx-auto p-6 gap-8">
            
            <header className="space-y-2">
                <a href="/">&lt; Return to Main Page</a>
                <h1 className="text-3xl font-bold">LuTex Documentation</h1>
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

            <section className="space-y-2">
                <h2 className="text-xl font-semibold">Syntax</h2>

                <p className="text-gray-700">
                    LuTex uses a lightweight custom syntax that is converted into LaTeX before PDF generation.
                </p>

                <h3 className="font-semibold text-gray-800">Commands</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\section(text)</code> → Section heading</li>
                    <li><code>\sub(text)</code> → Subsection</li>
                    <li><code>\subsub(text)</code> → Subsubsection</li>
                    <li><code>\b(text)</code> → Bold text</li>
                    <li><code>\i(text)</code> → Italic text</li>
                    <li><code>\u(text)</code> → Underlined text</li>
                    <li><code>\tt(text)</code> → Typewriter / monospace text</li>
                    <li><code>\em(text)</code> → Emphasized text</li>
                    <li><code>- text</code> → List item (used inside environments)</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Environments</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li><code>\list(...)</code> → Bullet list (use <code>- item</code> per line)</li>
                    <li><code>\enumerate(...)</code> → Numbered list</li>
                    <li><code>\center(...)</code> → Centered text block</li>
                    <li><code>\document(...)</code> → Document block (reserved)</li>
                </ul>

                <h3 className="font-semibold text-gray-800">Example</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`\section(Title)

\\b(Hello world)

\\itemize(
- First item
- Second item
)

\\center(This is centered text)`}
                </pre>

                <h3 className="font-semibold text-gray-800">Notes</h3>
                <ul className="list-disc list-inside text-gray-700">
                    <li>All commands use parentheses, not braces.</li>
                    <li>List items must start with <code>-</code>.</li>
                    <li>Blocks are parsed with regex, so keep formatting simple and clean.</li>
                    <li>Nested environments are not fully supported yet.</li>
                </ul>
            </section>

            <footer className="pt-6 text-sm text-gray-500 self-center">
                &copy; LuTex {new Date().getFullYear()}
            </footer>
        </div>
    );
}