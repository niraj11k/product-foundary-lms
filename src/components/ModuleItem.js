"use client";

import { useState } from 'react';
import { IconLock, IconCheckCircle, IconPlayCircle } from './Icons';
import ModuleContent from './ModuleContent'; // Import the new component

export default function ModuleItem({ course, module, isLocked, isCompleted, onComplete }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (!isLocked) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${isLocked ? 'opacity-60 bg-gray-50' : 'opacity-100'}`}>
            <div onClick={handleToggle} className={`p-4 flex justify-between items-center ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className="flex items-center space-x-4">
                    {isLocked ? <IconLock className="w-5 h-5 text-gray-400" /> :
                     isCompleted ? <IconCheckCircle className="w-5 h-5 text-green-500" /> :
                     <IconPlayCircle className="w-5 h-5 text-blue-500" />}
                    <span className="font-semibold text-lg text-gray-800">{module.title}</span>
                </div>
                <span className="text-sm font-medium text-gray-500">
                    {isLocked ? 'Locked' : isCompleted ? 'Completed' : 'Pending'}
                </span>
            </div>
            {isOpen && !isLocked && (
                <div className="p-6 border-t border-gray-200">
                    {/* <p className="text-gray-700 mb-4">
                        Module content for: <code className="bg-gray-200 p-1 rounded">{module.slug}</code>
                    </p> */}
                    <ModuleContent repoUrl={course.github_repo_url} moduleSlug={module.slug} />
                    {!isCompleted && (
                        <button
                            onClick={() => onComplete(module.id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Mark as Complete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}