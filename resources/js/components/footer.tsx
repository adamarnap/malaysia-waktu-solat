export default function Footer() {
    return (
        <footer className="flex flex-col sm:flex-row fixed bottom-0 min-w-full items-center h-auto sm:h-16 px-4 border-t md:px-6 mt-auto dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm py-4 sm:py-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025{" "}
                <a
                    className="hover:underline underline-offset-4 dark:text-pink-300 dark:hover:text-pink-200"
                    href="https://iqfareez.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Muhammad Fareez
                </a>
            </p>
            <nav className="mt-2 sm:mt-0 sm:ml-auto flex flex-wrap gap-4 sm:gap-6">
                <a
                    className="text-sm hover:underline underline-offset-4 dark:text-gray-300 dark:hover:text-pink-200"
                    href="/about"
                >
                    About
                </a>
            </nav>
        </footer>
    );
}