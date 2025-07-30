"use client";

export default function FreeContentPage() {
    const videos = [
        { id: '5K4pE01_dDk', title: 'Next.js 14 Full Course' },
        { id: 'Rz-22y_Kqjg', title: 'Supabase Crash Course' },
    ];

    const tutorials = [
        { title: 'Official Next.js Docs', url: 'https://nextjs.org/docs' },
        { title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Free Content & Tutorials</h2>
            <p className="text-gray-600 mb-8">A collection of free resources to get you started. No sign-in required!</p>

            <section>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Featured Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map(video => (
                        <div key={video.id} className="bg-white p-4 rounded-xl shadow-md">
                            <div className="aspect-w-16 aspect-h-9 mb-3">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                ></iframe>
                            </div>
                            <h4 className="font-bold text-gray-800">{video.title}</h4>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Helpful Links</h3>
                <div className="space-y-3">
                    {tutorials.map(tutorial => (
                        <a
                            key={tutorial.title}
                            href={tutorial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
                        >
                            <p className="font-semibold text-blue-600">{tutorial.title}</p>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}