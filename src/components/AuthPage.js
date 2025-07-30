"use client";

import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import CoursePage from './CoursePage';

export default function AuthPage() {
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                router.refresh();
            }
        });

        // Cleanup the subscription when the component unmounts
        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Join or Sign In</h2>
            <p className="text-center text-gray-500 mb-6">Start your learning journey today.</p>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="default"
                providers={['github']}
                // By removing the `providers` prop, the component will default to 
                // showing email/password sign-in, plus any social providers 
                // (like GitHub) that are enabled in your Supabase project.
                // The 2FA/MFA flow is handled automatically by this component
                // once you enable it in your Supabase project settings.
                // but it can be a good fallback.
                redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
            />
        </div>
    );
}

// export default function Dashboard({ user }) {
//     const supabase = createClient();
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedCourse, setSelectedCourse] = useState(null);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 setLoading(true);
//                 const { data, error } = await supabase.from('courses').select('*');
//                 if (error) throw error;
//                 setCourses(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCourses();
//     }, []);

//     if (selectedCourse) {
//         return <CoursePage course={selectedCourse} user={user} onBack={() => setSelectedCourse(null)} />;
//     }

//     if (loading) return <div className="text-center p-8">Loading courses...</div>;
//     if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

//     return (
//         <div className="max-w-7xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {courses.length > 0 ? courses.map(course => (
//                     <div
//                         key={course.id}
//                         onClick={() => setSelectedCourse(course)}
//                         className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
//                     >
//                         <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
//                         <p className="text-gray-600 mt-2">Click to view modules</p>
//                     </div>
//                 )) : (
//                     <p className="text-gray-500">No courses available yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }