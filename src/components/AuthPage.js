"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import CoursePage from './CoursePage';

export default function Dashboard({ user }) {
    const supabase = createClient();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.from('courses').select('*');
                if (error) throw error;
                setCourses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (selectedCourse) {
        return <CoursePage course={selectedCourse} user={user} onBack={() => setSelectedCourse(null)} />;
    }

    if (loading) return <div className="text-center p-8">Loading courses...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? courses.map(course => (
                    <div
                        key={course.id}
                        onClick={() => setSelectedCourse(course)}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 mt-2">Click to view modules</p>
                    </div>
                )) : (
                    <p className="text-gray-500">No courses available yet.</p>
                )}
            </div>
        </div>
    );
}