import "./globals.css";

export const metadata = {
    title: "LuTeX",
    description: "Generate LaTeX-based PDFs",
    icons: {
        icon: [
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
        ],
    },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
