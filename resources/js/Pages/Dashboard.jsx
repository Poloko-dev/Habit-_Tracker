import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 italic">
                    HABITIFY
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-8 md:p-16">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 leading-tight mb-4">
                                Welcome to Habitify
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700">
                                Track your progress and build meaningful habits with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
