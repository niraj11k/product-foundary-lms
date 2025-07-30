"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import ModuleItem from './ModuleItem';

export default function CoursePage({ course, user, onBack }) {
    const supabase = createClient();
    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: modulesData, error: modulesError } = await supabase
                    .from('modules')
                    .select('*')
                    .eq('course_id', course.id)
                    .order('sequence_number', { ascending: true });
                if (modulesError) throw modulesError;
                setModules(modulesData);

                const moduleIds = modulesData.map(m => m.id);
                const { data: progressData, error: progressError } = await supabase
                    .from('user_module_progress')
                    .select('module_id, is_completed')
                    .eq('user_id', user.id)
                    .in('module_id', moduleIds);
                if (progressError) throw progressError;

                const progressMap = new Map(progressData.map(p => [p.module_id, p.is_completed]));
                setProgress(progressMap);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [course.id, user.id]);

    const handleMarkAsComplete = async (moduleId) => {
        try {
            const newProgress = new Map(progress);
            newProgress.set(moduleId, true);
            setProgress(newProgress);

            const { error } = await supabase
                .from('user_module_progress')
                .upsert({ user_id: user.id, module_id: moduleId, is_completed: true }, { onConflict: 'user_id, module_id' });
            if (error) throw error;
        } catch (err) {
            const newProgress = new Map(progress);
            newProgress.set(moduleId, false);
            setProgress(newProgress);
            alert("Error saving progress: " + err.message);
        }
    };

    if (loading) return <div className="text-center p-8">Loading modules...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

    let isPreviousModuleCompleted = true;

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="mb-6 text-blue-600 hover:underline">&larr; Back to Courses</button>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-8">Complete modules in order to unlock the next one.</p>
            <div className="space-y-4">
                {modules.map(module => {
                    const isCompleted = progress.get(module.id) || false;
                    const isLocked = !isPreviousModuleCompleted;
                    if (!isLocked) {
                       isPreviousModuleCompleted = isCompleted;
                    }
                    return <ModuleItem key={module.id} module={module} isLocked={isLocked} isCompleted={isCompleted} onComplete={handleMarkAsComplete} />;
                })}
            </div>
        </div>
    );
}