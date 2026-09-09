export default function Footer() {
    return (
        <footer className="
            border-t
            border-gray-300
            relative
            bottom-0
            text-gray-500
            [&_a]:text-gray-500!
            [&_a]:hover:text-blue-600!
        ">
            <div className="
                flex
                flex-col
                items-center
                justify-between
                gap-4
                px-6
                py-6
                text-sm
                sm:flex-row
            ">
                <p>
                    © {new Date().getFullYear()} Resume Designer by{" "}
                    <a
                        href="https://lucamawyin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Luca Mawyin
                    </a>
                </p>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/LucaMawyin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://lucamawyin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Luca Mawyin
                    </a>
                </div>
            </div>
        </footer>
    );
}
