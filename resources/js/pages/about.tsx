import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function About() {
    const [language, setLanguage] = useState<'bm' | 'en'>('bm');
    return (
        <>
            <Head title="About">
                <meta
                    name="description"
                    content="Learn about the Malaysia Waktu Solat API - how prayer time data is collected, disclaimers, and fair use policy."
                />
                <meta property="og:title" content="About - Waktu Solat API Malaysia" />
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="MPT API" />
                <link rel="manifest" href="/site.webmanifest" />
                <script defer src="https://umami.iqfareez.com/script.js" data-website-id="11df7d3a-fb7e-4bbd-aacb-222515ea7b32"></script>
            </Head>{' '}
            <main className="min-h-screen bg-white pb-20 dark:bg-gray-950">
                {' '}
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-24 pt-12">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-bold">
                            <a href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                                Home{' '}
                            </a>
                            / About
                        </h1>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setLanguage('bm')}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${language === 'bm'
                                    ? 'bg-pink-500 text-white dark:bg-pink-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Bahasa Melayu
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${language === 'en'
                                    ? 'bg-pink-500 text-white dark:bg-pink-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                            >
                                English
                            </button>
                        </div>
                    </div>{' '}
                    <div className="space-y-12 pt-12">
                        {/* Bahasa Melayu Section */}
                        {language === 'bm' && (
                            <section>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Pengenalan</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            Malaysia Waktu Solat API menyediakan data waktu solat yang tepat untuk kesemua tempat di Malaysia. Kami
                                            menyediakan maklumat seperti waktu solat bulanan, pengesanan zon berdasarkan koordinat dan lain-lain.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
                                            Bagaimana data waktu solat dikumpulkan
                                        </h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            Kami mengumpulkan data dengan mengakses API dari laman e-solat JAKIM dalam beberapa sela masa yang
                                            ditetapkan. Untuk mengekalkan kestabilan dan ketersediaan data sepanjang masa, kami menyimpan data
                                            tersebut ke dalam pangkalan data kami. <strong>Penafian:</strong> Jakim e-solat API tidak didokumenkan
                                            secara rasmi, mungkin ia tidak direka untuk kegunaan luar, jadi terdapat risiko untuk struktur data
                                            berubah tanpa sebarang pemberitahuan. Kami berusaha sedaya upaya kami untuk mengadaptasi supaya qualiti
                                            data dapat dikekalkan sepanjang masa. Untuk maklumat teknikal, sila lawati repository kami di{' '}
                                            <a
                                                href="https://github.com/mptwaktusolat/api-waktusolat-x"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-pink-500 underline hover:text-pink-400 dark:text-pink-300 dark:hover:text-pink-200"
                                            >
                                                https://github.com/mptwaktusolat/api-waktusolat-x
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Penafian</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            Perkhidmatan Malaysia Waktu Solat API ini disediakan tanpa waranti, dan pengguna mengaksesnya atas risiko
                                            sendiri, mengakui bahawa perkhidmatan mungkin tidak bebas dari kesilapan, tidak sentiasa tersedia, atau
                                            selamat, dan penyedia tidak bertanggungjawab atas sebarang kerosakan yang timbul daripada penggunaannya.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Polisi Penggunaan Adil</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            Malaysia Waktu Solat API ini dibernarkan untuk kegunaan peribadi dan komersial. Penggunaan yang berlebihan
                                            atau penyalahgunaan API ini boleh mengakibatkan penggantungan akses sementara atau kekal. Pengguna
                                            digalakkan untuk menyimpan data secara 'local' untuk mengurangkan permintaan berulang.
                                        </p>
                                    </div>{' '}
                                </div>
                            </section>
                        )}
                        {/* English Section */}
                        {language === 'en' && (
                            <section>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Introduction</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            The Malaysia Waktu Solat API provides accurate prayer times (waktu solat) for various locations in
                                            Malaysia. It offers information on monthly prayer timings, zone detection based on coordinates and more.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">How prayer time data is collected</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            We collect the data by tapping inside JAKIM's e-solat API in some pre-determined frequency. To maintain
                                            stability and availability of this API, we store the data snapshot on our own database.{' '}
                                            <strong>Disclaimer:</strong> JAKIM API is undocumented and probably not meant to be used by the public, as
                                            it can change without prior notice. Hence, we try our best to adapt for every new changes with the API to
                                            keep the data remains up to date every year. For more technical details, visit our repository at{' '}
                                            <a
                                                href="https://github.com/mptwaktusolat/api-waktusolat-x"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-pink-500 underline hover:text-pink-400 dark:text-pink-300 dark:hover:text-pink-200"
                                            >
                                                https://github.com/mptwaktusolat/api-waktusolat-x
                                            </a>
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Disclaimer</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            The Malaysia Waktu Solat API service is provided without warranty, and users access it at their own risk,
                                            acknowledging that the service may not be error-free, available at all times, or secure, and the provider
                                            is not liable for any damages arising from its use.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Fair Use Policy</h3>
                                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                            The Malaysia Waktu Solat API is allowed for personal and commercial use. However, excessive use or abuse
                                            of the API may result in temporary or permanent suspension of access. Users are encouraged to cache data
                                            locally to minimize repeated requests.{' '}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}{' '}
                    </div>
                    {/* Footer Section with Bento Grid Design */}
                    <div className="mt-16 pt-8">
                        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* Waktu Solat Project Card */}
                            <a
                                href="https://waktusolat.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <div className="relative z-10">
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold">Waktu Solat Project</h3>
                                    <p className="text-sm text-blue-100">Try our prayer time app!</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </a>

                            {/* Feedback Card */}
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSe-zlZBW-8hO9XPDlLf-K7AUxtgupmD6bo4iouyLXFPAMnxFA/viewform?usp=sf_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <div className="relative z-10">
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold">Feedback</h3>
                                    <p className="text-sm text-green-100">Share your thoughts or report issues</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </a>

                            {/* GitHub Card */}
                            <a
                                href="https://github.com/mptwaktusolat/api-waktusolat-x"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <div className="relative z-10">
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold">GitHub</h3>
                                    <p className="text-sm text-gray-300">View source code or send patches</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </a>

                            {/* Analytics Card */}
                            <a
                                href="https://umami.iqfareez.com/share/dQGLdz7BivSE54it/api.waktusolat.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <div className="relative z-10">
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold">Analytics</h3>
                                    <p className="text-sm text-purple-100">Site statistics</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
