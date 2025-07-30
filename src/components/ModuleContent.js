// src/components/ModuleContent.js

"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ModuleContent({ repoUrl, moduleSlug }) {
    const [markdownContent, setMarkdownContent] = useState('');
    // This line declares the 'videoId' state variable. The error occurs if this is missing.
    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!repoUrl || !moduleSlug) return;

        const fetchModuleData = async () => {
            try {
                setLoading(true);
                // Example repoUrl: https://github.com/niraj11k/opencode-course
                // This extracts "niraj11k/opencode-course"
                const repoPath = new URL(repoUrl).pathname.substring(1);
                
                // Constructs the URL to the raw content.md file
                // IMPORTANT: This path assumes your modules are in a subfolder.
                // Adjust "opencode-course-template" if your structure is different.
                // const contentUrl = `https://raw.githubusercontent.com/${repoPath}/main/opencode-course-template/${moduleSlug}/content.md`;
                const basePath = `https://raw.githubusercontent.com/${repoPath}/main/opencode-course-template/${moduleSlug}`;
                console.log("Base Path:" + basePath);
                // --- Fetch Markdown Content ---
                const markdownResponse = await fetch(`${basePath}/content.md`);
                if (markdownResponse.ok) {
                    const text = await markdownResponse.text();
                    setMarkdownContent(text);
                } else {
                    setMarkdownContent('No text content found for this module.');
                }
                // --- Fetch Video Content ---
                const videoResponse = await fetch(`${basePath}/video.txt`);
                if (videoResponse.ok) {
                    const id = await videoResponse.text();
                    // This line updates the state with the fetched video ID.
                    setVideoId(id.trim());
                }
                // const response = await fetch(contentUrl);

                // if (!response.ok) {
                //     throw new Error(`File not found or unable to fetch. (Status: ${response.status})`);
                // }

                // const text = await response.text();
                // setContent(text);
            } catch (err) {
                setError(err.message);
                setContent('Could not load module content. Please check the repository structure and file path.');
            } finally {
                setLoading(false);
            }
        };

       fetchModuleData();
    }, [repoUrl, moduleSlug]);

    if (loading) {
        return <div className="p-4 text-gray-500">Loading content...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500 prose"><p>{content}</p></div>;
    }

    return (
        <div className="p-4">
            {/* Conditionally render the video player if a videoId exists */}
            {videoId && (
                <div className="mb-6 aspect-w-16 aspect-h-9">
                     <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Course Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg shadow-lg"
                    ></iframe>
                </div>
            )}
            {/* The 'prose' class from Tailwind's typography plugin gives nice default styling */}
            <div className="prose prose-blue max-w-none p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
            </div>
        </div>
    );
}